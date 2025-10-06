// src/stores/StoreContext.ts
import React, {useContext} from 'react';
import {rootStore, RootStore} from './RootStore';

const StoreContext = React.createContext<RootStore>(rootStore);

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);
