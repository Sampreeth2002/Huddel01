import React, { useState, useEffect } from "react";

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

  function handleChange(event) {
    setTitle(event.target.value);
  }

  useEffect(() => {
    async function createRoomAsync() {
      if (roomId) {
        const tx = await room.createRoom(roomId, title, {
          from: walletAddress,
        });
        await tx.wait();
      }
    }

    createRoomAsync();
  }, [roomId, title, walletAddress, room]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleChange} />
      </label>
      <button type="submit">Create Room</button>

      {walletAddress && <p>Current wallet address: {walletAddress}</p>}
      {roomId && <p>Room Id : {roomId}</p>}
    </form>
  );
}

export default CreateRoom;
