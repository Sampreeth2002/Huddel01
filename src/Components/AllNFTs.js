import { useState, useEffect, useContext } from "react";
import { ItemsContext } from "./Context/ItemsContext";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import "./Card.css";

const Home = ({ marketplace, nft, accountInfo }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsBySeller, setItemsBySeller] = useState();
  const { allItems, setAllItems } = useContext(ItemsContext);
  const [sellersInfo, setSellerInfo] = useState([]);

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

    items.forEach(async (item) => {
      const seller = item.seller;
      const sellerItems = itemsBySellerMap.get(seller) || [];
      sellerItems.push(item);
      itemsBySellerMap.set(seller, sellerItems);
    });

    setItemsBySeller(itemsBySellerMap);
    let allSellerInformation = [];
    Promise.all(
      Array.from(itemsBySellerMap.keys()).map(async (seller, index) => {
        let sellerInformation = await accountInfo.getUser(seller);

        allSellerInformation.push(sellerInformation);
      })
    ).then(() => {
      setSellerInfo(allSellerInformation);
    });

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
      <main style={{ padding: "1rem 0", textAlign: "center" }}>
        <CircularProgress />
      </main>
    );
  if (!allItems) {
    return null; // or loading indicator, error message, etc.
  }

  return (
    <>
      <div
        className="top"
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "1.5vw",
          paddingTop: "3vh",
        }}
      >
        {sellersInfo.length === 0
          ? "NFTs NOT CURRENTLY FOR SALE"
          : "Creator NFT Collection"}
      </div>
      <div className="card-wrapper">
        {sellersInfo.map((seller) => (
          <div className="card">
            <div className="card-img">
              <img
                src={seller[3]}
                className="card-img-top"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className="card-title">
              <h3>{seller[0]}</h3>
            </div>
            <div className="card-details">
              <p>{seller[2]} Lorem ipsum dolor sit amet consectetur, </p>
            </div>
            <div className="card-meta"></div>
            <div className="card-seperator"></div>
            <div className="card-creator">
              <Button
                variant="outlined"
                component="a"
                href={`/creator-nfts/${seller[1]}`}
              >
                Buy NFT's
              </Button>
            </div>
          </div>
        ))}
        {/* <div style={{ padding: "2vw" }}>
        <div style={{ paddingBottom: "2vw", fontSize: "2vw" }}>Creators</div>
        <div className="card-container">
          {sellersInfo.map((seller) => (
            <div style={{ padding: "2vw" }}>
              <Card sx={{ maxWidth: 345 }} key={seller[1]}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">
                      <img
                        src={`https://ui-avatars.com/api/?name=${seller[0]}&background=random&font-size=0.33`}
                        alt="avatar"
                      />
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={seller[0]}
                />
                <CardMedia
                  component="img"
                  height="180"
                  image={seller[3]}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {seller[2]} Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Labore quisquam commodi voluptas est error
                    ab, placeat qui quod esse vero eos, natus repudiandae facere
                    et tenetur, consequuntur alias. Fugiat, magni.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    variant="contained"
                    component="a"
                    href={`/creator-nfts/${seller[1]}`}
                  >
                    Buy NFT's
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div> */}
      </div>
    </>
  );
};
export default Home;
