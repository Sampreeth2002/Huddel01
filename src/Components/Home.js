import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";

import "../App.css";
import "./Room.css";

function Home() {
  return (
    <>
      <div>
        <div style={{ textAlign: "center", color: "white" }}>
          <br />
          <br />
          <h1 style={{ color: "hsl(178, 100%, 50%)" }}>VidCast</h1>
          <p style={{ color: "hsl(215, 51%, 70%)" }}>
            Where NFTs Ignite Creativity and Foster Community
          </p>
        </div>
        <br />
        <br />

        {/* <div
          style={{
            textAlign: "center",
            color: "white",
            width: "1100px",
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
            display: "none",
          }}
        >
          <p style={{ marginRight: "20px" }}>
            Welcome to VidCast, the ultimate platform for users to become both
            creators and viewers. Craft your unique NFT collection and list it
            on our marketplace, featuring both Standard Edition and Special
            Edition NFTs. Users can purchase their favorite creator's NFTs and
            enjoy additional perks when buying Special Edition NFTs.
          </p>
          <br />
          <br />
          <p style={{ marginRight: "20px" }}>
            Easily manage and view your NFT purchases on VidCast. Creators can
            set up exclusive rooms for their NFT buyers, powered by Huddle SDK,
            where Special Edition NFT holders can act as co-hosts and engage
            using their camera and microphone. Standard NFT holders can watch
            and listen to the live video of co-hosts and the creator.
          </p>
          <br />
          <br />
          <p style={{ marginRight: "20px" }}>
            Special Edition NFT holders gain access to a separate chat section
            for direct communication with creators. VidCast utilizes Lighthouse
            SDK for secure storage of NFT files, such as PNG and JPEG images,
            and deploys smart contracts on the FVM using Filecoin Hyperspace
            (testnet) for a robust NFT ecosystem.
          </p>
        </div> */}

        <div style={{ color: "white", marginLeft: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent:"center"}}>
            <div style={{ marginRight: "100px" }}>
              <p
                style={{
                  marginLeft: "20px",
                  width: "600px",
                  textAlign: "center",
                  fontSize:"medium",
                }}
              >
                {" "}
                VidCast is a unique platform that allows creators to monetize
                their content through NFT collections, while viewers can have
                access to exclusive perks and features based on the NFTs they
                purchase. The platform also provides a community aspect, where
                users can interact with each other and the creators in real-time
                through the room and chat features.
              </p>
            </div>
            <div>
              <img
                src="https://www.tubefilter.com/wp-content/uploads/2021/05/bright-video-platform-1400x825.jpg"
                alt=""
                width={"500px"}
              />
            </div>
          </div>
          <br />
          <br />
          <div style={{ textAlign: "center" , margin: "0pc 10pc 0pc 10pc"}}>
            <h4 style={{ color: "hsl(215, 51%, 70%)" }}>
              Craft and Showcase Your Unique NFT Collection
            </h4>
            <p style={{ marginTop: "15px",fontSize:"medium", }}>
              {" "}
              You can list your NFTs in our marketplace, which features both
              Standard and Special Editions. We use LightHouse SDK to ensure
              secure and reliable transactions, and deploy them in FVM. As an
              added benefit, the original creator will receive 1% of royalties
              on every purchase.
            </p>
            <Button
              style={{ marginTop: "15px" }}
              variant="outlined"
              component="a"
              href={"/create"}
            >
              Create your NFT
            </Button>
          </div>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <h4 style={{ color: "hsl(215, 51%, 70%)" }}>
              Enjoy Exclusive Perks with Special Edition NFTs
            </h4>
            <p style={{ marginTop: "15px",fontSize:"medium", }}>
              {" "}
              - Experience added benefits when purchasing Special Edition NFTs
            </p>
            <Button
              style={{ marginTop: "15px" }}
              variant="outlined"
              component="a"
              href="/all-nfts"
            >
              Buy NFT's
            </Button>
          </div>

          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <h4 style={{ color: "hsl(215, 51%, 70%)" }}>
              Manage Your NFT Purchases with Ease
            </h4>
            <p style={{ marginTop: "15px",fontSize:"medium", }}>
              {" "}
              - Keep track of your favorite creator's NFTs and your own
              collection
            </p>
            <Button
              style={{ marginTop: "15px" }}
              variant="outlined"
              component="a"
              href="/my-purchases"
            >
              My Purchases
            </Button>
          </div>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <h4 style={{ color: "hsl(215, 51%, 70%)" }}>
              Create Rooms and Talk to Your NFT Buyers
            </h4>
            <p style={{ marginTop: "15px",fontSize:"medium", }}>
              {" "}
              - Engage with your NFT buyers in dedicated rooms powered by Huddle
              SDK
            </p>
            <Button
              style={{ marginTop: "15px" }}
              variant="outlined"
              component="a"
              href="/all-rooms"
            >
              Create Room
            </Button>
            <Button
              style={{ marginTop: "15px", marginLeft: "10px" }}
              variant="outlined"
              component="a"
              href="/all-rooms"
            >
              All Active Rooms
            </Button>
          </div>
          <br />
          <br />
          <div style={{ textAlign: "center", marginBottom:"2pc" }}>
            <h4 style={{ color: "hsl(215, 51%, 70%)" }}>
              Connect with Creators through Special NFT Holder Chats
            </h4>
            <p style={{ marginTop: "15px",fontSize:"medium", }}>
              {" "}
              - Foster direct communication using dedicated chat sections
            </p>
            <Button
              style={{ marginTop: "15px" }}
              variant="outlined"
              component="a"
              href="/all-special-edition-nft-buyers"
            >
              Chat with Creators
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
