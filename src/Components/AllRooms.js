import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
export default function AllRooms({ marketplace, nft, room }) {
  let [activeRoomsArray, setActiveRoomsArray] = useState([]);
  useEffect(() => {
    async function fetchRooms() {
      try {
        const activeRooms = await room.getActiveRooms();
        const allActiveRoomsArray = await Promise.all(
          Object.values(activeRooms).map(async (r) => {
            const roomDetails = await room.getRoom(r._hex);
            return { roomDetails, hex: r._hex };
          })
        );
        setActiveRoomsArray(allActiveRoomsArray);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRooms();
  }, []);
  return (
    <div>
      <h1>Active Rooms</h1>
      <ul>
        {activeRoomsArray.map((room) => (
          <li key={room.roomDetails[0]}>
            <strong>Name:</strong> {room.roomDetails[2]},{" "}
            <strong>Owner:</strong> {room.roomDetails[3]},{" "}
            <strong>Room Link:</strong> {room.roomDetails[0]},{" "}
            <strong>Hex:</strong> {room.hex}
            <Link to={`/join-room/${room.roomDetails[0]}/${room.hex}`}>
              Join the room
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
