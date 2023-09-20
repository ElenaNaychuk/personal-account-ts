import {makeAutoObservable} from "mobx";
import Credentials from "../domain/Credentials";
import {userLoginService} from "./store";

class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    loginUser = async (userData: Credentials) => {
        const {success} = await userLoginService.logIn(userData);
        return success;
    };

    isLoggedIn = () => {
        return userLoginService.isLoggedIn();
    }

    logOut = () => {
        userLoginService.logOut();
    }
}

export {AuthStore}