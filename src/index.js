import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        console.log(contactById || "Contact not found");
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("Contact created:", newContact);
        break;

      case "remove":
        const removedContact = await removeContact(id);
        console.log(
          removedContact ? "Contact removed:" : "Contact not found"
        );
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
  catch (error) {
    console.error("Error:", error.message);
  }
}

invokeAction(options);
