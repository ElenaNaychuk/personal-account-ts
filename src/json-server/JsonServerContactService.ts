import {IContact, IContactInsert, IContactUpdate} from "../domain/IContact";

const SERVER_URL = 'http://localhost:3001'
class JsonServerContactService {
//todo: ensure at backend (or in backend client implementation) that user cannot edit someone else's contacts
// or any other data
    addContact = async (contact:IContactInsert): Promise<{success:boolean, newContact?:IContact}> => {
        try {
            const userId = localStorage.getItem("token")
            const response = await fetch(`${SERVER_URL}/contacts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...contact, userId}),
                }
            );
            const newContact = await response.json();
            return {
                success:true,
                newContact,
            };
        }catch (error) {
            console.log(`Error: ${error}`);
            return {success: false};
        }
    }

    updateContact = async (contact:IContactUpdate):Promise<{success:boolean}> => {
        try {
            await fetch(`${SERVER_URL}/contacts/${contact.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                }
            );
            return {success:true};
        }catch (error) {
            console.log(`Error: ${error}`);
            return {success:false};
        }
    }

    deleteContact = async (contact:IContactUpdate):Promise<{success:boolean}> => {
        try {
            await fetch(`${SERVER_URL}/contacts/${contact.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                }
            );
            return {success:true};
        }catch (error) {
            console.log(`Error: ${error}`);
            return {success:false};
        }
    }
}
export {JsonServerContactService}