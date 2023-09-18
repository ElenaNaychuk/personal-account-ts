import {ILoginService} from "../domain/ILoginService";
import Credentials from "../domain/Credentials";
import JsonServerClient from "./JsonServerClient";
import {IUser} from "../domain/IUser";

class JsonServerLoginService implements ILoginService {
    private backend: JsonServerClient;

    constructor(backend: JsonServerClient) {
        this.backend = backend;
    }

    private get token(): string | null {
        return localStorage.getItem('token');
    }

    private set token(token: string | null) {
        if (token === null) {
            localStorage.removeItem('token');
            return;
        }
        localStorage.setItem('token', token);
    }

    async login(creds: Credentials): Promise<{ success: boolean; user?: IUser }> {
        const {success, user, token} = await this.backend.login(creds.email, creds.password);
        if(success) {
            this.token = token || null;
            return {success, user};
        }
        return {success};
    }

    isLoggedIn(): boolean {
        return this.token!==null;
    }
}
export {JsonServerLoginService};