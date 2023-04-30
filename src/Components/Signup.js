import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

async function getWalletAddress() {
  // Check if MetaMask is installed and enabled
  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  // Request permission to access the user's accounts
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Get the current account from MetaMask
  const accounts = await window.ethereum.request({ method: "eth_accounts" });

  if (accounts.length === 0) {
    throw new Error("No accounts found");
  }

  return accounts[0];
}

export default function Signup({ accountInfo }) {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const uploadDetails = async () => {
    if (image !== "") {
      const address = await getWalletAddress();
      setWalletAddress(address);

      const PRIVATE_KEY = "07e9dcde-22dd-4445-b0d4-557fabcc44cf";

      const createUser = async (name, address, description, image) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("PRIVATE-KEY", PRIVATE_KEY);
          myHeaders.append("Content-Type", "application/json");

          const data = {
            username: name,
            first_name: name,
            last_name: name,
            secret: String(address).toUpperCase(),
          };

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow",
          };

          const response = await fetch(
            "https://api.chatengine.io/users/",
            requestOptions
          );
          const result = await response.text();

          const tx = await accountInfo.createUser(name, description, image, {
            from: address,
          });
          await tx.wait();
        } catch (error) {
          console.log("error", error);
        }
      };

      createUser(name, address, description, image);
    }
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (e) => {
    const output = await lighthouse.upload(
      e,
      "7f431ff1.e8fc8d458b6645348cb20014441117a8",
      progressCallback
    );
    setImage("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  };

  return (
    <>
      {/* <Row>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          size="lg"
          required
          type="text"
          placeholder="Name"
        />
        <Form.Control
          onChange={(e) => setDescription(e.target.value)}
          size="lg"
          required
          as="textarea"
          placeholder="Description"
        />
        <Form.Control
          type="file"
          required
          name="file"
          onChange={(e) => uploadFile(e)}
        />
        <div>
          <Button onClick={uploadDetails} variant="primary" size="lg">
            Sign Up!
          </Button>
        </div>
      </Row>
       */}

      <div style={{ textAlign: "center" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} style={{ paddingTop: "7vh" }}>
            <Typography style={{ color: "white", fontSize: "4vh" }}>
              Create New Account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              required
              label="Name"
              style={{
                borderColor: "rgb(59,130,246,0.5)",
                borderWidth: "2px",
                borderRadius: "3px",
                borderStyle: "solid",
                color: "white",
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              required
              label="Description"
              style={{
                borderColor: "rgb(59,130,246,0.5)",
                borderWidth: "2px",
                borderRadius: "3px",
                borderStyle: "solid",
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="" style={{ color: "white", marginRight: "2vw" }}>
              Select your Avatar :
            </label>
            <input
              type="file"
              required
              name="file"
              onChange={uploadFile}
              style={{ color: "white" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button onClick={uploadDetails} variant="contained" size="large">
              SignUp!
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
