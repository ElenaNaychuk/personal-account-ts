import {IContact, IContactInsert, IContactUpdate} from "../domain/IContact";

const SERVER_URL = 'http://localhost:3001'
class JsonServerContactService {
//todo: ensure at backend (or in backend client implementation) that user cannot edit someone else's contacts
// or any other data
    addContact = async (contact:IContactInsert) => {
        try {
            const userId = localStorage.getItem("token")
            const response = await fetch(`${SERVER_URL}/contacts`, { //todo разобраться с возвращаемым значением и обработкой ошибки
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
            }
        }catch (error) {
            console.log(`Error: ${error}`);
            return {
                success: false,
            }
        }
    }

    updateContact = async (contact:IContactUpdate) => {
        try {
            const response = await fetch(`${SERVER_URL}/contacts/${contact.id}`, { //todo разобраться с возвращаемым значением и обработкой ошибки
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                }
            );
            console.log(await response.json())
        }catch (error) {
            console.log(`Error: ${error}`);
        }
    }
}
export {JsonServerContactService}