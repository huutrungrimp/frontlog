import {createContext, useContext} from "react";
import { AppContextProps } from "../../interface";


export const dataContext = createContext<AppContextProps|null>(null);

export const DataProvider = dataContext.Provider;
export const BackendUrlConsumer = dataContext.Consumer;

export const useData = () => useContext(dataContext);