import {IContact, IContactUpdate} from "../domain/IContact";
import {makeAutoObservable, runInAction} from "mobx";
import {JsonServerContactRepository} from "../json-server/JsonServerContactRepository";

const contactRepository = new JsonServerContactRepository();

class ContactStore {
    contacts: IContact[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadContacts = async () => {
        const contacts = await contactRepository.getContacts();
        runInAction(() => {
            this.contacts = contacts;
        })
    }

    addContact = async (contact: Partial<IContact>):Promise<boolean> => {
        this.isLoading = true;
        const {success, newContact} = await contactRepository.addContact(contact);

        runInAction(() => {
            this.isLoading = false;
            if (success) {
                if (newContact) {
                    this.contacts.push(newContact)
                }
            }
        });

        return success;
    }

    updateContact = async (contactUpdate: IContactUpdate):Promise<boolean> => {
        const {success} = await contactRepository.updateContact(contactUpdate);

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
        const {success} = await contactRepository.deleteContact(contact);

        runInAction(()=> {
            if (success) {
                this.contacts = this.contacts.filter(item => item.id !== contact.id);
            }
        })

        return success;
    }
}

export {ContactStore};