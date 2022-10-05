import { InfoContact } from "../../src/entities/InfoContact";
import { People } from "../../src/entities/People";
import { IRegisterContact } from "../../src/interfaces/contact.interface";
declare global {
  namespace Express {
    interface Request {
      validated: People | IRegisterContact;
      people: People;
      contacts: InfoContact[];
      contact: InfoContact;
    }
  }
}
