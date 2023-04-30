import { useState, useEffect } from "react";

import * as React from "react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import "./Card.css";

export default function MyPurchases({
  marketplace,
  nft,
  account,
  accountInfo,
}) {
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [sellerInformation, setSellerInformation] = useState([]);

  useEffect(() => {
    async function getUserAddress() {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(account);
    }

    getUserAddress();
  }, []);
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const itemCount = await marketplace.itemCount();

    const sellerPurchaseQuery = Array.from({ length: itemCount })
      .map((_, i) => i + 1)
      .map(async (i) => {
        const item = await marketplace.items(i);
        const presentOwner = await marketplace.getNftOwner(i);

        if (presentOwner.toUpperCase() !== userAddress.toUpperCase())
          return null;

        if (item.sold === false) return null;

        const uri = await nft.tokenURI(item.tokenId);

        // use uri to fetch the nft metadata stored on ipfs
        const metadata = await JSON.parse(uri);

        // const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);

        // get seller Information
        const seller = await accountInfo.getUser(item.seller);
        return {
          seller,
          purchase: {
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            isSpecialEdition: item.isSpecialEdition,
            sold: item.sold,
          },
        };
      });

    const sellerPurchase = (await Promise.all(sellerPurchaseQuery)).filter(
      (x) => x !== null
    );

    const sellerInformation = sellerPurchase.map((x) => x.seller);
    const purchases = sellerPurchase.map((x) => x.purchase);

    setLoading(false);
    setSellerInformation(sellerInformation);
    setPurchases(purchases);
  };
  useEffect(() => {
    loadPurchasedItems();
  }, [userAddress]);
  if (loading)
    return (
      <main style={{ padding: "1rem 0", textAlign: "center" }}>
        <CircularProgress />
      </main>
    );
  return (
    <div>
      {purchases.length > 0 ? (
        <div>
          <div>
            <div className="card-wrapper">
              {purchases.map((item, idx) => (
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
                        {parseInt(item.totalPrice._hex, 16) / Math.pow(10, 18)}{" "}
                        TFIL
                      </p>
                    </div>
                    <div className="right">
                      <Button
                        variant="outlined"
                        component="a"
                        href={`/resell-nft/${item.itemId}`}
                        style={{ padding: "1vw" }}
                      >
                        Re-Sell NFT
                      </Button>
                    </div>
                  </div>
                  <div className="card-seperator"></div>
                  <div className="card-creator">
                    <div className="card-creator-avator">
                      <img src={sellerInformation[idx][3]} alt="" />
                    </div>
                    <div className="card-creator-details">
                      <span>Creation of</span>
                      <span> {sellerInformation[idx][0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <main style={{ padding: "1rem 0", textAlign: "center" }}>
          <span style={{ color: "white", fontSize: "1.5vw" }}>
            NO PURCHASE'S
          </span>
        </main>
      )}
    </div>
  );
}
