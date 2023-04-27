import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";
import { ItemsContext } from "./Context/ItemsContext";
import { ItemsProvider } from "./Context/ItemsContext";
import CreatorNFT from "./CreatorNFT";

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsBySeller, setItemsBySeller] = useState();
  const { allItems, setAllItems } = useContext(ItemsContext);

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let itemsQuery = Array.from({ length: itemCount })
      .map((_, i) => i + 1)
      .map((i) =>
        marketplace.items(i).then(async (item) => {
          if (item.sold) return null;
          // get uri url from nft contract
          const uri = await nft.tokenURI(item.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const metadata = await JSON.parse(uri);
          // const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(item.itemId);
          // Add item to items array
          return {
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
          };
        })
      );

    const items = (await Promise.all(itemsQuery)).filter((x) => x != null);

    const itemsBySellerMap = new Map();

    items.forEach((item) => {
      const seller = item.seller;
      const sellerItems = itemsBySellerMap.get(seller) || [];
      sellerItems.push(item);
      itemsBySellerMap.set(seller, sellerItems);
    });
    setItemsBySeller(itemsBySellerMap);
    setItems(items);
    setAllItems(itemsBySellerMap);
    setLoading(false);
  };

  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  };

  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );
  if (!allItems) {
    return null; // or loading indicator, error message, etc.
  }

  return (
    <ItemsProvider allItems={allItems} setAllItems={setAllItems}>
      <div className="flex justify-center">
        {items.length > 0 ? (
          <div className="px-5 container">
            {Array.from(itemsBySeller.keys()).map((seller) => (
              <div key={seller}>
                <p>Seller: {seller}</p>
              </div>
            ))}
            <CreatorNFT
              allItems={allItems}
              creatorAccount={"0x636CB54997C6D21F0e179CF371bd9Ea7f4Cdfc27"}
            />
          </div>
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
      </div>
    </ItemsProvider>
  );
};
export default Home;
