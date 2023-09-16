import {UserStore} from "./UserStore";
import { createContext, useContext } from "react";

const store = {
    userStore: new UserStore,
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store;