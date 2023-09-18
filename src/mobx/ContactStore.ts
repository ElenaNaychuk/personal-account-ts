import {IContact, IContactInsert, IContactUpdate} from "../domain/IContact";
import {makeAutoObservable, runInAction} from "mobx";
import {JsonServerUserService} from "../json-server/JsonServerUserService";
import {JsonServerContactService} from "../json-server/JsonServerContactService";

const userService = new JsonServerUserService();
const contactService = new JsonServerContactService();

class ContactStore {
    contacts: IContact[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadUserContacts = async () => {
        const contacts = await userService.getUserContacts();
        runInAction(() => {
            this.contacts = contacts;
        })
    }

    addContact = async (contact: IContactInsert):Promise<boolean> => {
        const {success, newContact} = await contactService.addContact(contact);
        this.isLoading = true;

        runInAction(() => {
            if (success) {
                if (newContact) {
                    this.contacts.push(newContact)
                }
            }
            this.isLoading = false;
        });

        return success;
    }

    updateContact = async (contactUpdate: IContactUpdate):Promise<boolean> => {
        const {success} = await contactService.updateContact(contactUpdate);

        runInAction(() => {
            if(success) {
                const contact = this.contacts.find(item => item.id === contactUpdate.id);
                if (!contact) {
                    return;
                }
                Object.assign(contact, contactUpdate);
            }
        });

        return success;
    }

    deleteContact = async (contact:IContactUpdate):Promise<boolean> => {
        const {success} = await contactService.deleteContact(contact);

        runInAction(()=> {
            if (success) {
                this.contacts = this.contacts.filter(item => item.id !== contact.id);
            }
        })

        return success;
    }
}

export {ContactStore};