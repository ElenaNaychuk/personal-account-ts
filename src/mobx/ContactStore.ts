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

    getUserContacts = () => {
        return this.contacts;
    }

    updateContact = async (contactUpdate: IContactUpdate) => {
        await contactService.updateContact(contactUpdate);
        runInAction(() => {
            const contact = this.contacts.find(item => item.id === contactUpdate.id);
            if (!contact) {
                return;
            }
            Object.assign(contact, contactUpdate);
        });
    }

    addContact = async (newContact: IContactInsert) => {
        const result = await contactService.addContact(newContact);
        this.isLoading = true;

        runInAction(() => {
            if (result.success) {
                this.contacts.push(result.newContact)
            } else {
                alert('error');
                console.log(result);//todo
            }
            this.isLoading = false;
        });

    }
}

export {ContactStore};