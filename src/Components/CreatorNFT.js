import React, { useContext, useState, useEffect } from "react";
import { ItemsContext } from "./Context/ItemsContext";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import "./Card.css";

export default function CreatorNFT({
  room,
  userInfo,
  accountInfo,
  marketplace,
}) {
  const { creatorAddress } = useParams();
  const { allItems } = useContext(ItemsContext);
  const [sellerItemsForCreator, setSellerItemsForCreator] = useState([]);
  const [sellerInformation, setSellerInformation] = useState([]);

  const getSellerInformation = async () => {
    if (allItems) {
      const information = Array.from(allItems.values())
        .filter((sellerItems) => sellerItems[0].seller === creatorAddress)
        .flatMap((sellerItems) => sellerItems);
      setSellerItemsForCreator(information);
      const sellerInformation = await accountInfo.getUser(creatorAddress);
      setSellerInformation(sellerInformation);
    }
  };

  const buyMarketItem = async (item) => {
    if (item) {
      await (
        await marketplace.purchaseItem(item.itemId, {
          value: item.totalPrice,
        })
      ).wait();
      getSellerInformation();
    }
  };

  useEffect(() => {
    getSellerInformation();
  }, [allItems, creatorAddress]);

  return (
    <div className="card-wrapper">
      {sellerItemsForCreator.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-img">
            <img
              src={item.image}
              className="card-img-top"
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="card-title">
            <h3>{item.name}</h3>
          </div>
          <div className="card-details">
            <p>{item.description}</p>
            {item.isSpecialEdition ? (
              <div>
                <br />
                <span
                  style={{
                    backgroundColor: "#ffd700",
                    padding: "0.25vw",
                    borderRadius: "5px",
                    color: "black",
                    fontSize: "10px",
                  }}
                >
                  SPECIAL EDITION
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <div className="card-meta">
            <div className="left">
              <span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Filecoin.svg/1200px-Filecoin.svg.png"
                  alt=""
                  width={"30px"}
                />
              </span>{" "}
              <p>
                {parseInt(item.totalPrice._hex, 16) / Math.pow(10, 18)} TFIL
              </p>
            </div>
            <div className="right">
              {creatorAddress === userInfo[1] ? (
                ""
              ) : (
                <>
                  <Button
                    variant="outlined"
                    style={{ padding: "1vw" }}
                    onClick={() => buyMarketItem(item)}
                  >
                    Buy NFT
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="card-seperator"></div>
          <div className="card-creator">
            <div className="card-creator-avator">
              <img src={sellerInformation[3]} alt="" />
            </div>
            <div className="card-creator-details">
              <span>Creation of</span>
              <span> {sellerInformation[0]}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
