import {IJsonServerClient} from "./JsonServerClient";
import Credentials from "../domain/Credentials";

export default class FakeJsonServerClientDecorator implements IJsonServerClient {
    private client: IJsonServerClient

    constructor(client: IJsonServerClient) {
        this.client = client;
    }

    async request(url: string, method: string = 'GET', body?: any): Promise<any | void> {
        if (url === '/login' && method === 'POST') {
            const creds = <Credentials>body;
            const searchParams = new URLSearchParams({email: creds.email, password: creds.password});
            const [user] = await this.request(`/users?${searchParams}`);
            return {accessToken: user.id};
        }
        return this.client.request(url, method, body);
    }
}
