import {makeAutoObservable, runInAction} from "mobx";
import Credentials from "../domain/Credentials";
import {JsonServerLoginService} from "../json-server/JsonServerLoginService";
import JsonServerClient from "../json-server/JsonServerClient";
import {ILoginService} from "../domain/ILoginService";
import {IUser} from "../domain/IUser";
import {JsonServerUserService} from "../json-server/JsonServerUserService";
import {IContact} from "../domain/IContact";
import {deflateRaw} from "zlib";

const backendClient = new JsonServerClient();
const userLoginService:ILoginService = new JsonServerLoginService(backendClient);
const userService = new JsonServerUserService();

class UserStore {
    user: IUser | undefined;
    userContacts: IContact[] = [];
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

    loadUserContacts = async () => {
        const contacts = await userService.getUserContacts();
        runInAction(()=> {
            this.userContacts = contacts;
        })
    }

    getUserContacts = () => {
        return this.userContacts;
    }
}

export {UserStore}