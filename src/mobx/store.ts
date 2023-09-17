import {UserStore} from "./UserStore";
import { createContext, useContext } from "react";
import {ContactStore} from "./ContactStore";

const store = {
    userStore: new UserStore,
    contactStore: new ContactStore(),
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store;