import { Request } from "express";
import { People } from "../entities/People";
import { serializerContact } from "../utils";
import PeopleRepository from "../repositories/people.repository";
import InfoContactRepository from "../repositories/infoContact.repository";
import {
  listAllPeoplesSchema,
  retrievePeopleSchema,
} from "../schemas/people.schema";

class PeopleService {
  registerPeople = async ({ validated }: Request) => {
    const peopleValidated = validated as People;

    const people = await PeopleRepository.save(peopleValidated);

    return await retrievePeopleSchema.validate(people, { stripUnknown: true });
  };

  listAllPeople = async () => {
    const allPeoples = await PeopleRepository.listAll();

    const mappedPeoples = allPeoples.map((people) => {
      const mappedContacts = people.contacts.map((contact) =>
        serializerContact(contact)
      );

      return { ...people, contacts: mappedContacts };
    });

    return await listAllPeoplesSchema.validate(mappedPeoples, {
      stripUnknown: true,
    });
  };

  deletePeople = async ({ people }: Request) => {
    const id = people.id as string;

    for (let contact of people.contacts) {
      const contactId = contact.id as string;
      await InfoContactRepository.delete(contactId);
    }

    return await PeopleRepository.delete(id);
  };

  updatePeople = async ({ people, body }: Request) => {
    const { firstName, lastName } = body;

    const payload = { firstName, lastName };

    const id = people.id as string;

    await PeopleRepository.update(id, payload);

    const updatedPeople = (await PeopleRepository.retrieve(id)) as People;

    const mappedContacts = updatedPeople.contacts.map((contact) =>
      serializerContact(contact)
    );

    const mappedPeople = { ...updatedPeople, contacts: mappedContacts };

    return await retrievePeopleSchema.validate(mappedPeople, {
      stripUnknown: true,
    });
  };
}

export default new PeopleService();
