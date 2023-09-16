import {IContact} from "../domain/IContact";

const SERVER_URL = 'http://localhost:3001'

class JsonServerUserService {

    getUserContacts = async ():Promise<IContact[]> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${SERVER_URL}/contacts?userId=${token}`);
        return await response.json();
    }
}
export {JsonServerUserService};