import {IContact} from "../domain/IContact";
import {makeAutoObservable, runInAction} from "mobx";
import {contactRepository} from "./store";

class ContactStore {
    contacts: IContact[] = [];
    isLoaded = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadContacts = async (): Promise<void> => {
        if (this.isLoaded || this.isLoading) {
            return;
        }
        this.setLoading(true);

        const contacts = await contactRepository.getContacts();

        this.setLoading(false);
        this.setLoaded(true);

        runInAction(() => {
            this.contacts = contacts;
        })
    }

    addContact = async (contact: Partial<IContact>): Promise<boolean> => {
        const {success, newContact} = await contactRepository.addContact(contact);
        runInAction(() => {
            if (success) {
                if (newContact) {
                    this.contacts.push(newContact)
                }
            }
        });

        return success;
    }

    updateContact = async (contactUpdate: Partial<IContact> & { id: number }): Promise<boolean> => {
        const {success} = await contactRepository.updateContact(contactUpdate);
        runInAction(() => {
            if (success) {
                const contact = this.contacts.find(item => item.id === contactUpdate.id);
                if (!contact) {
                    return;
                }
                Object.assign(contact, contactUpdate);
            }
        });

        return success;
    }

    deleteContact = async (contact: Partial<IContact> & { id: number }): Promise<boolean> => {
        const {success} = await contactRepository.deleteContact(contact);
        runInAction(() => {
            if (success) {
                this.contacts = this.contacts.filter(item => item.id !== contact.id);
            }
        })

        return success;
    }

    private setLoaded(value: boolean): void {
        this.isLoaded = value;
    }

    private setLoading(value: boolean): void {
        this.isLoading = value;
    }
}

export {ContactStore};