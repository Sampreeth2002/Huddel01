import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navbar";
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
import Record from "./Components/Record";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Spinner } from "react-bootstrap";
import "./App.css";

import Test from "./Components/test";
import JoinRoom from "./Components/JoinRoom";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [room, setRoom] = useState({});
  const [accountInfo, setAccountInfo] = useState();
  const [singedInUser, setSingedInUser] = useState(true);
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
      setSingedInUser(true);
    };
    if (accountInfo) checkSignedInUser();
  }, [account, accountInfo]);

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

    setLoading(false);
  };

  return !singedInUser ? (
    <Signup />
  ) : (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
          {/* <Routes>
            <Route
              path="/record/:roomIdFromUrl"
              element={
                <Record marketplace={marketplace} nft={nft} room={room} />
              }
            />
          </Routes> */}
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
              <Spinner animation="border" style={{ display: "flex" }} />
              <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Home marketplace={marketplace} nft={nft} />}
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
                  />
                }
              />
              <Route
                path="/create-room"
                element={
                  <CreateRoom marketplace={marketplace} nft={nft} room={room} />
                }
              />
              <Route
                path="/join-room/:roomId/:hex"
                element={
                  <JoinRoom marketplace={marketplace} nft={nft} room={room} />
                }
              />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
