import React from "react";
import { store } from "../../store/Store";

export const storeContext  = React.createContext();
export const StoreContext = ({children}) =>  <storeContext.Provider value={store}>{children}</storeContext.Provider>
export const StoreConsumer = ({children}) =>  <storeContext.Consumer>{children}</storeContext.Consumer>
