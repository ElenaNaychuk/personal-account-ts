import {IUser} from "../domain/IUser";

const SERVER_URL = 'http://localhost:3001';


export default class JsonServerClient {
    //todo универсальный метод реквест
    //todo: фейк клиент декоратор добавляющий фейковый метод логина, выделить общий интерфейс
    async login(email: string, password: string): Promise<{ success: boolean, user?: IUser, token?: string }> {
        const searchParams = new URLSearchParams({email, password});

        try {
            const response = await fetch(`${SERVER_URL}/users?${searchParams}`);
            const [user] = await response.json();
            const token = user.id;
            return {
                success: true,
                user,
                token,
            }
        } catch (error) {
            console.log(`Error: ${error}.`);
            return {
                success: false,
            }

        }
    }

//
//     isLoggedIn(): boolean {
//         return this.token !== null;
//     }
//
//     getUserContacts = () => {
//     }
//
//     request({url, method, body}: { url: string; method?: string; body?: any }) { //todo any
//         if (url === '/login' && method === 'POST') { // todo: implement real backend client with real secure token etc
//
//         }
//         const response = await fetch(`${SERVER_URL}${url}`);
//         const [promise] = response.json();
//         await [promise]
//     }
}
