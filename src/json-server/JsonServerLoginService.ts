import {ILoginService} from "../domain/ILoginService";
import Credentials from "../domain/Credentials";
import {IJsonServerClient} from "./JsonServerClient";
import {IUser} from "../domain/IUser";

class JsonServerLoginService implements ILoginService {
    private backend: IJsonServerClient;

    constructor(backend: IJsonServerClient) {
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

    async logIn(creds: Credentials): Promise<{ success: boolean; user?: IUser }> {
        try {
            const {accessToken} = await this.backend.request('/login', 'POST', creds);
            this.token = accessToken || null;
            return {success: true};
        } catch (error) {
            console.log(`Error: ${error}`);
            return {success: false};
        }
    }

    isLoggedIn(): boolean {
        return this.token !== null;
    }

    logOut = () => {
        localStorage.removeItem('token');
    }
}

export {JsonServerLoginService};