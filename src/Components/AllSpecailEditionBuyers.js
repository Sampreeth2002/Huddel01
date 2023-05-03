import React, { useEffect, useState } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";

import "./Chat.css";

export default function AllSpecailEditionBuyers({
  userInfo,
  marketplace,
  accountInfo,
}) {
  const [allSpecailEditionBuyers, setAllSpecailEditionBuyers] = useState([]);
  const [username, setUsername] = useState("");

  const createDirectChat = async (creds) => {
    await Promise.all(
      allSpecailEditionBuyers.map((buyer) =>
        getOrCreateChat(
          creds,
          { is_direct_chat: true, usernames: [buyer] },
          () => setUsername("")
        )
      )
    );
  };

  function renderChatForm(creds) {
    return (
      <div>
        {/* <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> */}
        <button
          onClick={() => createDirectChat(creds)}
          style={{ display: "none" }}
        >
          Create
        </button>
      </div>
    );
  }

  useEffect(() => {
    async function fetchBuyersInformation() {
      const buyersInformation =
        await marketplace.getSpecialEditionBuyersByAddress(userInfo[1]);
      const uniqueArray = [...new Set(buyersInformation)];
      let usernamesArray = [];
      // setAllSpecailEditionBuyers(uniqueArray);
      for (let i = 0; i < uniqueArray.length; i++) {
        let userDetails = await accountInfo.getUser(uniqueArray[i]);
        usernamesArray.push(userDetails[0]);
      }
      setAllSpecailEditionBuyers(usernamesArray);
    }

    fetchBuyersInformation();
  }, []);

  return (
    <div className="test1">
      <ChatEngine
        className="test2"
        projectID="fa6b62e6-bef5-44df-956d-12826a0e7700"
        userName={userInfo[0]}
        userSecret="Password"
        renderNewChatForm={(creds) => renderChatForm(creds)}
        style={{
          backgroundColor: "red !important",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 9999,
        }}
      />
    </div>
  );
}
