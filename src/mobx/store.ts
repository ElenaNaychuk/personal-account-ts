import {AuthStore} from "./AuthStore";
import {createContext, useContext} from "react";
import {ContactStore} from "./ContactStore";
import FakeJsonServerClientDecorator from "../json-server/FakeJsonServerClientDecorator";
import {IJsonServerClient, JsonServerClient} from "../json-server/JsonServerClient";
import {JsonServerLoginService} from "../json-server/JsonServerLoginService";
import {JsonServerContactRepository} from "../json-server/JsonServerContactRepository";
import {ILoginService} from "../domain/ILoginService";
import {IContactRepository} from "../domain/IContactRepository";

export const backendClient: IJsonServerClient = new FakeJsonServerClientDecorator(
    new JsonServerClient('http://localhost:3001'));
export const userLoginService: ILoginService = new JsonServerLoginService(backendClient);
export const contactRepository: IContactRepository = new JsonServerContactRepository(backendClient);

const store = {
    authStore: new AuthStore(),
    contactStore: new ContactStore(),
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store;