import {IContact} from "../domain/IContact";
import {IContactRepository} from "../domain/IContactRepository";
import {IJsonServerClient} from "./JsonServerClient";

class JsonServerContactRepository implements IContactRepository {
    private backend: IJsonServerClient;

    constructor(backend: IJsonServerClient) {
        this.backend = backend;
    }

    getContacts = async (): Promise<IContact[]> => {//todo: move to contact repo
        try {
            const token = localStorage.getItem("token"); //имитация получения данных по токену юзера
            return await this.backend.request(`/contacts?userId=${token}`);
        } catch (error) {
            return [];
        }
    }

    addContact = async (contact: Partial<IContact>): Promise<{ success: boolean, newContact?: IContact }> => {
        const token = localStorage.getItem("token"); //имитация получения данных по токену юзера
        try {
            const newContact = await this.backend.request("/contacts", "POST", {...contact, userId: token});
            return {success: true, newContact};
        } catch (error) {
            console.log(`Error: ${error}`);
            return {success: false};
        }
    }

    updateContact = async (contact: Partial<IContact> & { id: number }): Promise<{ success: boolean }> => {
        try {
            await this.backend.request(`/contacts/${contact.id}`, "PATCH", contact);
            return {success: true};
        } catch (error) {
            console.log(`Error: ${error}`);
            return {success: false};
        }
    }

    deleteContact = async (contact: Partial<IContact> & { id: number }): Promise<{ success: boolean }> => {
        try {
            await this.backend.request(`/contacts/${contact.id}`, "DELETE", contact);
            return {success: true};
        } catch (error) {
            console.log(`Error: ${error}`);
            return {success: false};
        }
    }
}

export {JsonServerContactRepository};