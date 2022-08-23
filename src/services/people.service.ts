import { Request } from "express";
import { People } from "../entities/People";
import { IUpdatePeople } from "../interfaces/people.interface";
import PeopleRepository from "../repositories/people.repository";
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

    return await listAllPeoplesSchema.validate(allPeoples, {
      stripUnknown: true,
    });
  };

  deletePeople = async ({ people }: Request) => {
    const id = people.id as string;
    return await PeopleRepository.delete(id);
  };

  updatePeople = async ({ people }: Request, payload: IUpdatePeople) => {
    const id = people.id as string;
    await PeopleRepository.update(id, payload);
  };
}

export default new PeopleService();
