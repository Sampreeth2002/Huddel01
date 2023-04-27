import React, { useContext } from "react";
import { ItemsContext } from "./Context/ItemsContext";
import { Button } from "react-bootstrap";

export default function CreatorNFT({ allItems, creatorAccount, userInfo }) {
  //   const { allItems } = useContext(ItemsContext);

  const sellerItemsForCreator = Array.from(allItems.values())
    .filter((sellerItems) => sellerItems[0].seller === creatorAccount)
    .flatMap((sellerItems) => sellerItems);

  return (
    <div>
      <p className="mx-3 my-0">
        {console.log(userInfo)}
        {userInfo ? <>userInfo[0] userInfo[2]</> : "NOthing"}
      </p>
      {sellerItemsForCreator.map((item) => (
        <div key={item.itemId}>
          <p>Item Name: {item.name}</p>
          <p>Description: {item.description}</p>
          <img src={item.image} alt={item.name} width={"250px"} />
          {/* <Button onClick={() => buyMarketItem(item)}>Buy Now</Button> */}
        </div>
      ))}
    </div>
  );
}
