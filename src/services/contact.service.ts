import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/Contact";
import { InfoContact } from "../entities/InfoContact";
import { ErrorHandler } from "../errors/errorHandler";
import { IRegisterContact } from "../interfaces/contact.interface";
import InfoContactRepository from "../repositories/infoContact.repository";
import { listContactsSchema } from "../schemas/contacts.schema";
import { serializerContact } from "../utils";
import { addContactSchema } from "../schemas/contacts.schema";

class ContactService {
  addContact = async ({ validated, people }: Request) => {
    const peopleValidated = validated as IRegisterContact;

    const ContactRepo = AppDataSource.getRepository(Contact);

    const contactName = (await ContactRepo.findOne({
      where: {
        contact: peopleValidated.contact,
      },
    })) as Contact;

    if (!contactName) {
      throw new ErrorHandler(
        400,
        "Contact must be an email, phone or whatsapp"
      );
    }

    const registerContact = new InfoContact();
    registerContact.info = peopleValidated.info;
    registerContact.name = contactName;
    registerContact.people = people;

    console.log(registerContact);

    await InfoContactRepository.save(registerContact);

    const peopleId = people.id as string;
    const contactsOfPeople = await InfoContactRepository.retrieveContacts(
      peopleId
    );

    const mappedContacts = contactsOfPeople.map((contact) =>
      serializerContact(contact)
    );

    return await listContactsSchema.validate(mappedContacts, {
      stripUnknown: true,
    });
  };

  retrieveContactsOfPeople = async ({ people }: Request) => {
    const peopleId = people.id as string;
    const contactsOfPeople = await InfoContactRepository.retrieveContacts(
      peopleId
    );

    const mappedContacts = contactsOfPeople.map((contact) =>
      serializerContact(contact)
    );

    return await listContactsSchema.validate(mappedContacts, {
      stripUnknown: true,
    });
  };

  deleteContact = async ({ contact }: Request) => {
    const id = contact.id as string;
    return await InfoContactRepository.delete(id);
  };

  updateContact = async ({ contact, body }: Request) => {
    const id = contact.id as string;
    const { info, contact: contactData } = body;

    const payload = { info, name: contactData };

    if (contactData) {
      const ContactRepo = AppDataSource.getRepository(Contact);
      const newContact = await ContactRepo.findOne({
        where: { contact: contactData },
      });

      if (!newContact) {
        throw new ErrorHandler(
          422,
          "Contact must be a email, phone or whatsapp!"
        );
      }
      payload.name = newContact.id;
    }

    await InfoContactRepository.update(id, payload);

    const contactUpdated = (await InfoContactRepository.retrieve(
      id
    )) as InfoContact;

    const mappedContact = serializerContact(contactUpdated);

    console.log(mappedContact);

    return await addContactSchema.validate(mappedContact, {
      stripUnknown: true,
    });
  };
}

export default new ContactService();
