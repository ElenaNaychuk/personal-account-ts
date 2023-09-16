import Credentials from "./Credentials";
import {IUser} from "./IUser";

export interface ILoginService {
    login(creds: Credentials):Promise<{ success: boolean; user?: IUser }>;
    isLoggedIn():boolean;
}