import React, { useState } from 'react';
import { createContext } from 'react';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const MainContextData = { items, setItems };
  return <MainContext.Provider value={MainContextData}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
