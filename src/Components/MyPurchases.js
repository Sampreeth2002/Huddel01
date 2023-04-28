import { useState, useEffect } from "react";
import { ethers } from "ethers";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    setLoading(false);
    console.log(purchases);
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
    <div>
      {purchases.length > 0 ? (
        <div>
          {/* <Row xs={1} md={2} lg={4}>
            {purchases.map((item, idx) => (
              <Col key={idx}>
                <Card.Img variant="top" src={item.image} />
                <Card.Footer>
                  {ethers.utils.formatEther(item.totalPrice)} ETH
                </Card.Footer>
                <Card.Footer>{item.name}</Card.Footer>
                <Card.Footer>{item.seller}</Card.Footer>
              </Col>
            ))}
          </Row> */}
          <div style={{ padding: "2vw" }}>
            <div style={{ paddingBottom: "2vw", fontSize: "2vw" }}>
              Special Edition NFT's
            </div>
            <div className="card-container">
              <div style={{ padding: "2vw" }}>
                <Card sx={{ maxWidth: 345 }} style={{ paddingTop: "2vh" }}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image="https://w0.peakpx.com/wallpaper/677/237/HD-wallpaper-mrbeast-mr-beast-youtube.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
              <div style={{ padding: "2vw" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://w0.peakpx.com/wallpaper/677/237/HD-wallpaper-mrbeast-mr-beast-youtube.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            </div>
            <div style={{ paddingBottom: "2vw", fontSize: "2vw" }}>
              Standard Edition NFT's
            </div>
            <div className="card-container">
              <div style={{ padding: "2vw" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://w0.peakpx.com/wallpaper/677/237/HD-wallpaper-mrbeast-mr-beast-youtube.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
              <div style={{ padding: "2vw" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://w0.peakpx.com/wallpaper/677/237/HD-wallpaper-mrbeast-mr-beast-youtube.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No purchases</h2>
        </main>
      )}
    </div>
  );
}
