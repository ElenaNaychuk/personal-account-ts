import {makeAutoObservable, runInAction} from "mobx";
import Credentials from "../domain/Credentials";
import {JsonServerLoginService} from "../json-server/JsonServerLoginService";
import JsonServerClient from "../json-server/JsonServerClient";
import {ILoginService} from "../domain/ILoginService";
import {IUser} from "../domain/IUser";

const backendClient = new JsonServerClient();
const userLoginService:ILoginService = new JsonServerLoginService(backendClient);

class UserStore {
    user: IUser | undefined;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loginUser = async (userData: Credentials) => {
        const {success, user} = await userLoginService.login(userData);
        this.isLoading = true;

        runInAction(() => {
            if( success) {
                this.user = user;
            }
        });

        return success;
    };

    isLoggedUser = () => {
        return userLoginService.isLoggedIn();
    }
}

export {UserStore}