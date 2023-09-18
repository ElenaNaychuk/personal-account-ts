import {IContact, IContactUpdate} from "./IContact";

export interface IContactRepository {
    getContacts():Promise<IContact[]>;
    addContact(contact:Partial<IContact>): Promise<{success:boolean, newContact?:IContact}>;
    updateContact(contact:IContactUpdate):Promise<{success:boolean}>;
    deleteContact(contact:IContactUpdate):Promise<{success:boolean}>;
}
