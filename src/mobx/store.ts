import {AuthStore} from "./AuthStore";
import { createContext, useContext } from "react";
import {ContactStore} from "./ContactStore";

const store = {
    authStore: new AuthStore,
    contactStore: new ContactStore(),
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store;