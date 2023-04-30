import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Room from "./Room";

export default function JoinRoom({ nft, marketplace, room }) {
  const { roomId, hex } = useParams();
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [roomOwnerAddress, setRoomOwnerAddress] = useState("");
  const [isNftHolder, setIsNftHolder] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    async function getUserAddress() {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(account);
    }

    async function getRoomOwnerAddress() {
      const roomDetails = await room.getRoom(parseInt(hex, 16));
      setRoomOwnerAddress(roomDetails[4]);
    }

    getUserAddress();
    getRoomOwnerAddress();
  }, []);

  useEffect(() => {
    if (userAddress && roomOwnerAddress) checkCreatorNftHolder();
  }, [userAddress, roomOwnerAddress]);

  const checkCreatorNftHolder = async () => {
    if (userAddress.toUpperCase() === roomOwnerAddress.toUpperCase()) {
      setIsCreator(true);
      setIsNftHolder(true);
      // return;
    }
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const itemCount = await marketplace.itemCount();
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      const presentOwner = await marketplace.getNftOwner(i);
      if (presentOwner.toUpperCase() === userAddress.toUpperCase()) {
        if (item.seller.toUpperCase() === roomOwnerAddress.toUpperCase()) {
          if (item.sold === true) {
            setIsNftHolder(true);
          }
        }
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
        {isNftHolder ? (
          <Room roomId={roomId} />
        ) : (
          "Not Authorized to join the room"
        )}
      </div>
    </div>
  );
}
