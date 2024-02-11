import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const contactPath = path.join(process.cwd(), "db/contacts.json");

async function listContacts() {
    return JSON.parse(await fs.readFile(contactPath, "utf-8"));
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (removedContact) {
        const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
        await fs.writeFile(contactPath, JSON.stringify(updatedContacts, null, 2));
        return removedContact;
    } else {
        return null;
    }
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

export { listContacts, getContactById, removeContact, addContact };