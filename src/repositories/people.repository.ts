import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { People } from "../entities/People";

interface IPeopleRepo {
  save: (people: People) => Promise<People>;
  listAll: () => Promise<People[]>;
  retrieve: (id: string) => Promise<People | null>;
  update: (id: string, payload: Partial<People>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class PeopleRepository implements IPeopleRepo {
  private peopleRepo: Repository<People>;

  constructor() {
    this.peopleRepo = AppDataSource.getRepository(People);
  }

  save = async (people: People): Promise<People> => {
    return await this.peopleRepo.save({ ...people });
  };

  listAll = async () => await this.peopleRepo.find();

  retrieve = async (id: string) => await this.peopleRepo.findOneBy({ id: id });

  update = async (id: string, payload: Partial<People>) => {
    return await this.peopleRepo.update(id, { ...payload });
  };

  delete = async (id: string) => {
    return await this.peopleRepo.delete(id);
  };
}

export default new PeopleRepository();
