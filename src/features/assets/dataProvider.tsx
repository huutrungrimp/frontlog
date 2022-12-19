import {createContext, useContext} from "react";

const defaultValue = "";

export const dataContext = createContext(defaultValue);

export const DataProvider = dataContext.Provider;
export const BackendUrlConsumer = dataContext.Consumer;

export const useData = () => useContext(dataContext);