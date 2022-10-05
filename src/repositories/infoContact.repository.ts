import { DeleteResult, UpdateResult, Repository } from "typeorm";
import { InfoContact } from "../entities/InfoContact";
import { AppDataSource } from "../data-source";
import { IRegisterContact } from "../interfaces/contact.interface";
import PeopleRepository from "./people.repository";
import { People } from "../entities/People";

interface IInfoContactRepo {
  save: (info: InfoContact) => Promise<InfoContact>;
  retrieveContacts: (peopleId: string) => Promise<InfoContact[] | null>;
  update: (id: string, payload: Partial<InfoContact>) => Promise<UpdateResult>;
  retrieve: (id: string) => Promise<InfoContact | null>;
  delete: (id: string) => Promise<DeleteResult>;
}

class InfoContactRepository implements IInfoContactRepo {
  private infoContactRepo: Repository<InfoContact>;

  constructor() {
    this.infoContactRepo = AppDataSource.getRepository(InfoContact);
  }

  save = async (info: InfoContact) => await this.infoContactRepo.save(info);

  update = async (id: string, payload: Partial<InfoContact>) => {
    return await this.infoContactRepo
      .createQueryBuilder()
      .update(InfoContact)
      .set({ ...payload })
      .where("id = :id", { id })
      .execute();
  };

  delete = async (id: string) => await this.infoContactRepo.delete(id);

  retrieveContacts = async (peopleId: string) => {
    const people = (await PeopleRepository.retrieve(peopleId)) as People;
    return await this.infoContactRepo.find({ where: { people } });
  };

  retrieve = async (id: string) =>
    await this.infoContactRepo.findOne({ where: { id } });
}

export default new InfoContactRepository();
