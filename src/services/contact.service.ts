import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/Contact";
import { InfoContact } from "../entities/InfoContact";
import { ErrorHandler } from "../errors/errorHandler";
import {
  IRegisterContact,
  IUpdateContact,
} from "../interfaces/contact.interface";
import InfoContactRepository from "../repositories/infoContact.repository";
import { listContactsSchema } from "../schemas/contacts.schema";

class ContactService {
  addContact = async ({ validated, people }: Request) => {
    const peopleValidated = validated as IRegisterContact;

    const ContactRepo = AppDataSource.getRepository(Contact);

    const contactName = (await ContactRepo.findOne({
      where: {
        contact: peopleValidated.contact,
      },
    })) as Contact;

    const registerContact = new InfoContact();
    registerContact.info = peopleValidated.info;
    registerContact.name = contactName;
    registerContact.people = people;

    await InfoContactRepository.save(registerContact);

    const peopleId = people.id as string;
    const contactsOfPeople = await InfoContactRepository.retrieve(peopleId);

    return await listContactsSchema.validate(contactsOfPeople, {
      stripUnknown: true,
    });
  };

  retrieveContactsOfPeople = async ({ people }: Request) => {
    const peopleId = people.id as string;
    const contactsOfPeople = await InfoContactRepository.retrieve(peopleId);

    return await listContactsSchema.validate(contactsOfPeople, {
      stripUnknown: true,
    });
  };

  deleteContact = async ({ contact }: Request) => {
    const id = contact.id as string;
    return await InfoContactRepository.delete(id);
  };

  updateContact = async ({ contact }: Request, payload: IUpdateContact) => {
    const id = contact.id as string;

    const contactObj = payload.contact as string;

    if (contactObj) {
      const ContactRepo = AppDataSource.getRepository(Contact);
      const newContact = await ContactRepo.findOne({
        where: { contact: contactObj },
      });

      if (!newContact) {
        throw new ErrorHandler(
          422,
          "Contact must be a email, phone or whatsapp!"
        );
      }

      payload.contact = newContact;
    }

    await InfoContactRepository.update(id, payload);
  };
}

export default new ContactService();
