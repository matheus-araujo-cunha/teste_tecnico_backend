import { DeleteResult, UpdateResult, Repository } from "typeorm";
import { InfoContact } from "../entities/InfoContact";
import { AppDataSource } from "../data-source";
import { IRegisterContact } from "../interfaces/contact.interface";
import PeopleRepository from "./people.repository";
import { People } from "../entities/People";

interface IInfoContactRepo {
  save: (info: InfoContact) => Promise<InfoContact>;
  retrieve: (peopleId: string) => Promise<InfoContact[] | null>;
  update: (id: string, payload: Partial<InfoContact>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class InfoContactRepository implements IInfoContactRepo {
  private infoContactRepo: Repository<InfoContact>;

  constructor() {
    this.infoContactRepo = AppDataSource.getRepository(InfoContact);
  }

  save = async (info: InfoContact) => await this.infoContactRepo.save(info);

  update = async (id: string, payload: Partial<InfoContact>) =>
    await this.infoContactRepo.update(id, { ...payload });

  delete = async (id: string) => await this.infoContactRepo.delete(id);

  retrieve = async (peopleId: string) => {
    const people = (await PeopleRepository.retrieve(peopleId)) as People;
    return await this.infoContactRepo.find({ where: { people } });
  };
}

export default new InfoContactRepository();
