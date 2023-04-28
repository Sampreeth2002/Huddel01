import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { Row, Form, Button } from "react-bootstrap";

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
      console.log(image);
      const address = await getWalletAddress();
      setWalletAddress(address);

      console.log(accountInfo);

      const tx = await accountInfo.createUser(name, description, image, {
        from: address,
      });
      await tx.wait();
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
      <Row>
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
    </>
  );
}
