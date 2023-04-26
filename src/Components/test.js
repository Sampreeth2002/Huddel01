import React, { useState, useEffect } from "react";
import Web3 from "web3";
import storageAbi from "../abis/storage.json";
import { ethers } from "ethers";

// const providerUrl = "https://rpc.testnet.filecoin.io/rpc/v0";
// const web3 = new Web3(providerUrl);

// const contractAddress = "0x636CB54997C6D21F0e179CF371bd9Ea7f4Cdfc27";
// const storageContract = new web3.eth.Contract(contractABI, contractAddress);

export default function Test() {
  const [storedValue, setStoredValue] = useState(null);

  // useEffect(() => {

  //   storeValue(1234);
  //   retrieveValue();
  // }, []);

  async function storeValue(value) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    let storage = new ethers.Contract(
      "0xE9849De32958272087f3af83340AC06ED4d69676",
      storageAbi,
      signer
    );
    console.log("Jai datta");

    const tx = await storage.store(value);
    await tx.wait(); // Wait for the transaction to be mined
    const ans = await storage.retrieve();

    setStoredValue(ans.toNumber());
  }

  // async function retrieveValue() {
  //   const value = await storage.retrieve().call();
  //   setStoredValue(value);
  // }

  return (
    <div>
      <div>Jai Balaya: {storedValue}</div>
      <button onClick={() => storeValue(78954)}>Click me</button>
    </div>
  );
}
