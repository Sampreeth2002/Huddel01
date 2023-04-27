import React, { useState, createContext } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [allItems, setAllItems] = useState();

  return (
    <ItemsContext.Provider value={{ allItems, setAllItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
