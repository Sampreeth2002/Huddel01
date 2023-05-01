import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "../App.css";
import "./Room.css";

export default function AllRooms({ room, accountInfo, userInfo }) {
  let [activeRoomsArray, setActiveRoomsArray] = useState([]);
  let [isCurrentUserRoomActive, setIsCurrentUserRoomActive] = useState(false);
  let [currentUserRoomId, setCurrentUserRoomId] = useState("");

  const deActive = async () => {

    await room.setRoomInactive(parseInt(currentUserRoomId, 16), false);
    setIsCurrentUserRoomActive(false);
  };

  async function fetchRooms() {
    try {
      const activeRooms = await room.getActiveRooms();
      const allActiveRoomsArray = await Promise.all(
        Object.values(activeRooms).map(async (r) => {
          const roomDetails = await room.getRoom(r._hex);
          const roomCreator = await accountInfo.getUser(roomDetails[4]);
          if (userInfo[1] === roomDetails[4]) {

            setIsCurrentUserRoomActive(true);
            setCurrentUserRoomId(r._hex);
          }

          return { roomDetails, hex: r._hex, roomCreator: roomCreator[0] };
        })
      );
      setActiveRoomsArray(allActiveRoomsArray);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [isCurrentUserRoomActive]);

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", flex: "1" }}>
            <div
              style={{
                paddingTop: "4vh",
                paddingBottom: "2vh",
                fontSize: "1.5vw",
                color: "white",
                marginLeft: isCurrentUserRoomActive ? "15vw" : "0",
              }}
            >
              ACTIVE ROOMS
            </div>
          </div>
          <div>
            {isCurrentUserRoomActive && (
              <Button variant="outlined" color="error" onClick={deActive}>
                Disable Active Room
              </Button>
            )}
          </div>
        </div>

        <div className="card-container">
          {activeRoomsArray.map((room) => (
            <div style={{ padding: "2vw" }} key={room.roomDetails[3]}>
              <figure className="snip1527">
                <div className="image">
                  <img src={room.roomDetails[5]} alt="pr-sample23" />
                </div>
                <figcaption>
                  {/* <div className="date">
                    <span className="day">28</span>
                    <span className="month">Oct</span>
                  </div> */}
                  <h3>
                    {room.roomDetails[0]} by{" "}
                    <span style={{ fontFamily: "cursive" }}>
                      {room.roomCreator}
                    </span>
                  </h3>
                  <p>{room.roomDetails[1]}</p>
                </figcaption>
                <a href={`/join-room/${room.roomDetails[3]}/${room.hex}`}></a>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
