import Credentials from "./Credentials";
import {IUser} from "./IUser";

export interface ILoginService {
    logIn(creds: Credentials):Promise<{ success: boolean; user?: IUser }>;
    isLoggedIn():boolean;
    logOut():void;
}