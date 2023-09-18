import {makeAutoObservable, runInAction} from "mobx";
import Credentials from "../domain/Credentials";
import {JsonServerLoginService} from "../json-server/JsonServerLoginService";
import JsonServerClient from "../json-server/JsonServerClient";
import {ILoginService} from "../domain/ILoginService";
import {IUser} from "../domain/IUser";

const backendClient = new JsonServerClient();
const userLoginService:ILoginService = new JsonServerLoginService(backendClient);

class AuthStore {
    // user: IUser | undefined; пока нигде не используется
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loginUser = async (userData: Credentials) => {
        this.isLoading = true;
        const {success/*, user*/} = await userLoginService.login(userData);

        runInAction(() => {
            this.isLoading = false;
            // if( success) {
            //     this.user = user;
            // }
        });

        return success;
    };

    isLoggedIn = () => {
        return userLoginService.isLoggedIn();
    }

    logOut = () => {
        userLoginService.logOut();
        // this.user = undefined;
    }
}

export {AuthStore}