import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import Navigation from "./Components/Navbar";
import AllNFTs from "./Components/AllNFTs";
import Home from "./Components/Home";
import Create from "./Components/Create.js";
import MyListedItems from "./Components/MyListedItems.js";
import MyPurchases from "./Components/MyPurchases.js";
import Signup from "./Components/Signup";
import MarketplaceAbi from "./abis/Marketplace.json";
import MarketplaceAddress from "./abis/Marketplace-address.json";
import NFTAbi from "./abis/NFT.json";
import NFTAddress from "./abis/NFT-address.json";
import RoomAbi from "./abis/Room.json";
import RoomAddress from "./abis/Room-address.json";
import AccountInforAbi from "./abis/AccountInfo.json";
import AccountInfoAddress from "./abis/AccountInfo-address.json";
import AllRooms from "./Components/AllRooms";
import CreateRoom from "./Components/CreateRoom";
import CreatorNFT from "./Components/CreatorNFT";
import Record from "./Components/Record";
import Resell from "./Components/Resell";
import AllSpecailEditionBuyers from "./Components/AllSpecailEditionBuyers";
import { useState, useEffect, createContext } from "react";
import { ItemsProvider } from "./Components/Context/ItemsContext";
import { ItemsContext } from "./Components/Context/ItemsContext";

import { ethers } from "ethers";
import CircularProgress from "@mui/material/CircularProgress";

import "./App.css";

import Test from "./Components/test";
import JoinRoom from "./Components/JoinRoom";

export const AppContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [room, setRoom] = useState({});
  const [accountInfo, setAccountInfo] = useState();
  const [singedInUser, setSingedInUser] = useState(true);
  const { userInfo, setUserInfo } = useContext(ItemsContext);
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    await loadContracts(signer);
    // await checkSignedInUser(account, accountInfo);
  };

  useEffect(() => {
    const checkSignedInUser = async () => {
      let check = await accountInfo.userExists(account);
      setSingedInUser(check);
    };
    if (accountInfo) checkSignedInUser();
  }, [account, accountInfo]);

  useEffect(() => {
    web3Handler();
  }, []);

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi, signer);
    setNFT(nft);
    const room = new ethers.Contract(RoomAddress.address, RoomAbi, signer);
    setRoom(room);
    const accountDetails = new ethers.Contract(
      AccountInfoAddress.address,
      AccountInforAbi,
      signer
    );
    setAccountInfo(accountDetails);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userInfo = await accountDetails.getUser(accounts[0]);

    setUserInfo(userInfo);

    setLoading(false);
  };
  return !singedInUser ? (
    <Signup accountInfo={accountInfo} />
  ) : (
    <BrowserRouter>
      <div>
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
              }}
            >
              <CircularProgress />
              <br />

              <p style={{ color: "white", marginLeft: "8px" }}>
                Awaiting Metamask Connection...
              </p>
            </div>
          ) : (
            <>
              {/* {
                  <p>
                    {userInfo[0]} {userInfo[2]}
                    <img src={userInfo[3]} width={"100px"} alt="" />
                  </p>
                } */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      userInfo={userInfo}
                      marketplace={marketplace}
                      nft={nft}
                    />
                  }
                />

                <Route
                  path="/all-nfts"
                  element={
                    <AllNFTs
                      accountInfo={accountInfo}
                      userInfo={userInfo}
                      marketplace={marketplace}
                      nft={nft}
                    />
                  }
                />
                <Route
                  path="/create"
                  element={<Create marketplace={marketplace} nft={nft} />}
                />
                <Route
                  path="/my-listed-items"
                  element={
                    <MyListedItems
                      marketplace={marketplace}
                      nft={nft}
                      account={account}
                    />
                  }
                />
                <Route
                  path="/my-purchases"
                  element={
                    <MyPurchases
                      marketplace={marketplace}
                      nft={nft}
                      accountInfo={accountInfo}
                      account={account}
                    />
                  }
                />
                <Route
                  path="/all-rooms"
                  element={
                    <AllRooms
                      marketplace={marketplace}
                      nft={nft}
                      account={account}
                      room={room}
                      accountInfo={accountInfo}
                      userInfo={userInfo}
                    />
                  }
                />
                <Route
                  path="/create-room"
                  element={
                    <CreateRoom
                      marketplace={marketplace}
                      nft={nft}
                      room={room}
                    />
                  }
                />
                <Route
                  path="/join-room/:roomId/:hex"
                  element={
                    <JoinRoom marketplace={marketplace} nft={nft} room={room} />
                  }
                />
                <Route
                  path="/record/:roomIdFromUrl"
                  element={
                    <Record marketplace={marketplace} nft={nft} room={room} />
                  }
                />
                <Route
                  path="/creator-nfts/:creatorAddress"
                  element={
                    <CreatorNFT
                      marketplace={marketplace}
                      nft={nft}
                      room={room}
                      userInfo={userInfo}
                      accountInfo={accountInfo}
                    />
                  }
                />
                <Route
                  path="/resell-nft/:itemId"
                  element={
                    <Resell
                      marketplace={marketplace}
                      nft={nft}
                      room={room}
                      userInfo={userInfo}
                      accountInfo={accountInfo}
                    />
                  }
                />
                <Route
                  path="/all-special-edition-nft-buyers/"
                  element={
                    <AllSpecailEditionBuyers
                      marketplace={marketplace}
                      nft={nft}
                      room={room}
                      userInfo={userInfo}
                      accountInfo={accountInfo}
                    />
                  }
                />
              </Routes>
            </>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
