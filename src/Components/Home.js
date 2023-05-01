import React, { useState, useContext } from "react";
import { ItemsContext } from "./Context/ItemsContext";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import "../App.css";
import "./Room.css";

function Home() {
  const { allItems, userInfo } = useContext(ItemsContext);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isRecordingOn, setIsRecordingOff] = useState(false);

  const handleVideoClick = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleMicClick = () => {
    setIsMicOn(!isMicOn);
  };

  const handleRecordClick = () => {
    setIsRecordingOff(!isRecordingOn);
  };

  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <div
          style={{
            paddingTop: "4vh",
            paddingBottom: "2vh",
            fontSize: "2vw",
            color: "white",
            textAlign: "center",
          }}
        >
          Live Streams
        </div>
        <div className="card-container">
          <div style={{ padding: "2vw" }}>
            <figure className="snip1527">
              <div className="image">
                <img alt="pr-sample23" />
              </div>
              <figcaption>
                {/* <div className="date">
                  <span className="day">28</span>
                  <span className="month">Oct</span>
                </div> */}
                <h3>Sampreeth Live Stream</h3>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                  can't be cool if you don't have an attitude.
                </p>
              </figcaption>
              <a href="/smapreeth"></a>
            </figure>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            paddingBottom: "2vw",
            fontSize: "2vw",
            color: "white",
            textAlign: "center",
          }}
        >
          Recordings
        </div>
        <div className="card-container">
          <div style={{ padding: "2vw" }}>
            <figure className="snip1527">
              <div className="image">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg"
                  alt="pr-sample23"
                />
              </div>
              <figcaption>
                <div className="date">
                  <span className="day">28</span>
                  <span className="month">Oct</span>
                </div>
                <h3>The World Ended Yesterday</h3>
                <p>
                  You know what we need, Hobbes? We need an attitude. Yeah, you
                  can't be cool if you don't have an attitude.
                </p>
              </figcaption>
              <a href="#"></a>
            </figure>
          </div>
        </div>
        <BottomNavigation
          sx={{
            width: 500,
            margin: "auto",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "hsl(216, 50%, 16%)",
            // color: "",
            zIndex: 999,
          }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label={isVideoOn ? "Video-On" : "Video-Off"}
            value="mic-on"
            onClick={handleVideoClick}
            icon={
              isVideoOn ? (
                <VideocamIcon label="Video-On" value="video-on" />
              ) : (
                <VideocamOffIcon label="Video-Off" value="video-off" />
              )
            }
          />
          {/* <BottomNavigationAction
            label="Mic-on"
            value="mic-on"
            icon={<MicIcon />}
          /> */}
          <BottomNavigationAction
            label={isMicOn ? "Mic-On" : "Mic-Off"}
            value="mic-on"
            onClick={handleMicClick}
            icon={
              isMicOn ? (
                <MicIcon label="Mic-On" value="mic-on" />
              ) : (
                <MicOffIcon label="Mic-Off" value="mic-off" />
              )
            }
          />
          <BottomNavigationAction
            disabled={true}
            label={isRecordingOn ? "Recording-On" : "Recording-Off"}
            value="mic-on"
            onClick={handleRecordClick}
            icon={
              isRecordingOn ? (
                <RadioButtonCheckedIcon
                  label="Recording-On"
                  value="recording-on"
                />
              ) : (
                <RadioButtonUncheckedIcon
                  label="Recording-Off"
                  value="recording-off"
                />
              )
            }
          />
          {/* <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<FolderIcon />}
          /> */}
        </BottomNavigation>
      </div>
    </>
  );
}

export default Home;
