import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card } from "react-bootstrap";

export default function MyPurchases({ marketplace, nft, account }) {
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);

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
    let purchases = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      const presentOwner = await marketplace.getNftOwner(i);
      if (presentOwner.toUpperCase() === userAddress.toUpperCase()) {
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const metadata = await JSON.parse(uri);

        // const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        purchases.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    //Fetch metadata of each nft and add that to listedItem object.
    // const purchases = await Promise.all(
    //   items.map(async (i) => {
    //     // // fetch arguments from each result
    //     // i = i.args;
    //     // get uri url from nft contract
    //     const uri = await nft.tokenURI(i.tokenId);
    //     // use uri to fetch the nft metadata stored on ipfs
    //     const metadata = await JSON.parse(uri);
    //     // get total price of item (item price + fee)
    //     const totalPrice = await marketplace.getTotalPrice(i.itemId);
    //     // define listed item object
    //     let purchasedItem = {
    //       totalPrice,
    //       price: i.price,
    //       itemId: i.itemId,
    //       name: metadata.name,
    //       description: metadata.description,
    //       image: metadata.image,
    //     };
    //     return purchasedItem;
    //   })
    // );
    setLoading(false);
    setPurchases(purchases);
  };
  useEffect(() => {
    loadPurchasedItems();
  }, [userAddress]);
  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );
  return (
    <div className="flex justify-center">
      {purchases.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {purchases.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>
                    {ethers.utils.formatEther(item.totalPrice)} ETH
                  </Card.Footer>
                  <Card.Footer>{item.name}</Card.Footer>
                  <Card.Footer>{item.seller}</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No purchases</h2>
        </main>
      )}
    </div>
  );
}
