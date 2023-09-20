import {IContact} from "./IContact";

export interface IContactRepository {
    getContacts():Promise<IContact[]>;
    addContact(contact:Partial<IContact>): Promise<{success:boolean, newContact?:IContact}>;
    updateContact(contact:Partial<IContact> & { id: number }):Promise<{success:boolean}>;
    deleteContact(contact:Partial<IContact> & { id: number }):Promise<{success:boolean}>;
}
