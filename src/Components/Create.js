import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { create as ipfsHttpClient } from "ipfs-http-client";
import lighthouse from "@lighthouse-web3/sdk";
import "./Card.css";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = ({ marketplace, nft }) => {
  const [userAddress, setUserAddress] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function getUserAddress() {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(account);
    }

    getUserAddress();
  }, []);

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

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = JSON.stringify({ image, price, name, description });
      mintThenList(result, userAddress);
    } catch (error) {}
  };

  const mintThenList = async (uri, userAddress) => {
    // mint nft
    await (await nft.mint(uri, userAddress)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} style={{ paddingTop: "7vh" }}>
          <Typography style={{ color: "white", fontSize: "4vh" }}>
            Create NFT
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
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            required
            type="number"
            label="Price (TFIL)"
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
          <input
            type="file"
            required
            name="file"
            onChange={uploadFile}
            style={{ color: "white" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={createNFT} variant="contained" size="large">
            Create & List NFT!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Create;
