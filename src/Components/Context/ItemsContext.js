import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import MarketplaceAbi from "../../abis/Marketplace.json";
import MarketplaceAddress from "../../abis/Marketplace-address.json";
import NFTAbi from "../../abis/NFT.json";
import NFTAddress from "../../abis/NFT-address.json";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [allItems, setAllItems] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [marketplace, setMarketplace] = useState();
  const [nft, setNFT] = useState();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi, signer);
    setNFT(nft);

    const loadItems = async () => {
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

      items.forEach(async (item, index) => {
        const seller = item.seller;
        // let sellerInformation = await accountInfo.getUser({ from: item.seller });
        // console.log(sellerInformation);
        const sellerItems = itemsBySellerMap.get(seller) || [];
        sellerItems.push(item);
        itemsBySellerMap.set(seller, sellerItems);
      });

      setAllItems(itemsBySellerMap);
    };

    loadItems();
  }, []);

  return (
    <ItemsContext.Provider
      value={{ allItems, setAllItems, userInfo, setUserInfo, marketplace }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
