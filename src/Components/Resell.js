import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./Card.css";
import { useParams } from "react-router-dom";

const Resell = ({ marketplace, nft }) => {
  const { itemId } = useParams();
  const [userAddress, setUserAddress] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function getUserAddress() {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(account);
    }

    getUserAddress();
  }, []);

  const ResellNFT = async () => {
    if (!price) return;
    try {
      const listingPrice = ethers.utils.parseEther(price.toString());

      await (
        await marketplace.resell(itemId, listingPrice, {
          from: userAddress,
        })
      ).wait();
      setPrice("");
    } catch (error) {}
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} style={{ paddingTop: "7vh" }}>
          <Typography style={{ color: "white", fontSize: "4vh" }}>
            Re-Sell NFT
          </Typography>
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
          <Button onClick={ResellNFT} variant="contained" size="large">
            Re-Sell NFT
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Resell;
