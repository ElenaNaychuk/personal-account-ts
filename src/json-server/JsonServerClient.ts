export interface IJsonServerClient {
    request(url: string, method?: string, body?: any): Promise<any | void>;
}

export class JsonServerClient implements IJsonServerClient {
    private readonly serverUrl: string

    constructor(serverUrl: string) {
        this.serverUrl = serverUrl;
    }

    async request(url: string, method: string = 'GET', body?: any): Promise<any | void> {
        const response = await fetch(`${this.serverUrl}${url}`, {
            method,
            ...(body !== undefined && {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }),
        });
        if (['UPDATE', 'DELETE'].includes(method)) {
            return;
        }
        return await response.json();
    }
}
