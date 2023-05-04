
# VidCast : 
Where NFTs Ignite Creativity and Foster Community.

Checkout our work here : https://huddel01.vercel.app/


## About the Project
VidCast is a unique platform that allows *creators/ influencers/ celebrities to monetize their content* through NFT collections, while viewers can have access to exclusive perks and features based on the NFTs they purchase.The platform also provides a community aspect, where users can interact with each other and the creators in real-time through the room and chat features.
## Problems solved by VidCast
- **Comprehensive Platform for Creators and Viewers** : VidCast provides a platform where users can both *create and consume content*.

- **Engagement between NFT creators and buyers** : VidCast allows creators to create *exclusive rooms for their NFT buyers* and have direct communication with "Special Edition NFT" holders through *video calling powered by Huddle SDK* and a secure chat system fostering more engagement and connection between creators and buyers.

-  **Secure storage for NFT files** : VidCast utilizes *Lighthouse SDK* to securely store NFT files created using *ERC721*, such as PNG, JPEG, etc images.

-  **Robust Infrastructure for Smart Contract Deployment** : Inadequate infrastructure for deploying smart contracts: VidCast deploys smart contracts on the *FVM* using Filecoin Hyperspace (testnet) for a *robust NFT ecosystem*.

- **Easy Creation and Showcase of NFT Collections** : VidCast allows creators to easily *create and showcase their unique NFT collections* in the marketplace.

-  **More Options and Perks for NFT Buyers** : VidCast offers two types of NFTs (Standard and Special Edition), giving buyers more options and added *perks when purchasing Special Edition NFTs*.

- **Streamlined NFT Purchase Management** : VidCast makes it easy for users to *manage and keep track of their NFT purchases*.

#### Overall, VidCast solves the problem of a fragmented NFT market by providing a comprehensive platform that benefits both creators and buyers, and offers a *secure and engaging environment for NFT transactions*.


## Problems encountered while developing the VidCast website:




* Providing smart contracts for NFTs using ERC721 and integrating Filecoin for selling in the marketplace, providing a royalty structure for the original inventor, and storing metadata such as picture links using Lighthouse SDK.

* Redeploying the smart contract in the event of a change that results in data loss.

* Learning how to use Filecoin Hyperspace to install smart contracts in the FVM and call the necessary read/write functions from the front end.

* Implementing a gated feature that only allows NFT purchasers to access live rooms while denying them permission to use their video and audio.

* Creating a feature that only allows a creator's Special Edition NFT purchasers to use their video and audio in live rooms.

* The process of integrating the chat feature exclusively for "Special Edition NFT" buyers and not for Standard Edition NFT buyers was time-consuming.

Most of the above problems are solved by going through the documentation and example projects of SDK and also discussing with the Huddle01 Discord Community.


## Tech Stack

React, Material UI, Solidity, Huddle01, LightHouse, FVM, FileCoin


## Run Locally

Clone the project

```bash
  git clone https://github.com/Sampreeth2002/Huddel01
```

Go to the project directory

```bash
  cd Huddel01
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Authors

- [@Sampreeth Miriyala](https://github.com/Sampreeth2002)
- [@Prateek Agrawal](https://github.com/prateekin)


## Features

- Gated entry to live rooms
- Create NFT ( Special Editions and Standard Editions)
- NFT's Marketplace
- Chat (Only with special editions users)


## Smart Contracts


- Account Smart contract :- https://beryx.zondax.ch/v1/search/fil/hyperspace/address/f410fygki7oph7i5d4t6ndtspmwrcdpl2rg6se62g3jy
- Marketplace Smart contract :- https://beryx.zondax.ch/v1/search/fil/hyperspace/address/f410fnjtcleupoaf4zvnr5h2bokqvfrvh4jmodyudr7a
- NFT Smart contract :- https://beryx.zondax.ch/v1/search/fil/hyperspace/address/f410f77hkr3lzgcsq3y4bugckfgq3lmjnd4ikqjrfwmi
- Room Smart contract :- https://beryx.zondax.ch/v1/search/fil/hyperspace/address/f410fpe4ylric6w3h7tsm2yf6t7eki6xyp3265ywh2uq

## FLowchart
![image](https://user-images.githubusercontent.com/82581367/236132523-48a693c2-3dfc-44d3-851f-1a2be4991108.png)

## Demo
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/RFE0nQjjIyk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
We can insert video here


## Feedback

If you have any feedback, please reach out to us at sampreeth2002@gmail.com

