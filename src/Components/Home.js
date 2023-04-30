import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ItemsContext } from "./Context/ItemsContext";
import "../App.css";
import "./Room.css";

function Home() {
  const { allItems, userInfo } = useContext(ItemsContext);

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
      </div>
    </>
  );
}

export default Home;
