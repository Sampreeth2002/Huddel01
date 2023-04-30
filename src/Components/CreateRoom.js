import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import lighthouse from "@lighthouse-web3/sdk";

async function createRoom(title, hostWallets) {
  const response = await fetch(
    "https://iriko.testing.huddle01.com/api/v1/create-room",
    {
      method: "POST",
      body: JSON.stringify({ title, hostWallets }),
      headers: {
        "Content-type": "application/json",
        "x-api-key": "VwTZ4AGTxme9snANex9tep3NwvVMGfYd",
      },
    }
  );

  const data = await response.json();

  return data;
}

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

function CreateRoom({ marketplace, nft, room }) {
  const [title, setTitle] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  let [roomId, setRoomId] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    // Get the current wallet address
    const address = await getWalletAddress();
    setWalletAddress(address);

    // Call the createRoom function with the title and wallet address
    await createRoom(title, [address])
      .then(async (data) => {
        setRoomId(data.data.roomId);
      })
      .catch((error) => console.error(error));
  }

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  };

  const uploadFile = async (e) => {
    const output = await lighthouse.upload(
      e,
      "7f431ff1.e8fc8d458b6645348cb20014441117a8",
      progressCallback
    );
    setImage("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  };

  useEffect(() => {
    async function createRoomAsync() {
      if (roomId && image && description) {
        const tx = await room.createRoom(title, roomId, description, image, {
          from: walletAddress,
        });
        await tx.wait();
      }
    }

    createRoomAsync();
  }, [roomId, title, walletAddress, room, image]);

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Title:
    //     <input type="text" value={title} onChange={handleChange} />
    //   </label>
    //   <button type="submit">Create Room</button>

    //   {walletAddress && <p>Current wallet address: {walletAddress}</p>}
    //   {roomId && <p>Room Id : {roomId}</p>}
    // </form>
    <div style={{ textAlign: "center" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} style={{ paddingTop: "7vh" }}>
          <Typography
            style={{ color: "white", fontSize: "4vh", paddingBottom: "3vh" }}
          >
            Create Room
          </Typography>
          <Grid item xs={12} style={{ paddingBottom: "3vh" }}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              required
              label="Room Name"
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
          <Grid item xs={12} style={{ paddingBottom: "3vh" }}>
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
              Select Image for Room
            </label>

            <input
              type="file"
              required
              name="file"
              onChange={uploadFile}
              style={{ color: "white" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" size="large">
            Create Room
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateRoom;
