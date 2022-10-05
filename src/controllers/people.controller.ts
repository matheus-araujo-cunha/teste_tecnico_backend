import { Request, Response } from "express";
import PeopleService from "../services/people.service";

class PeopleController {
  registerPeople = async (req: Request, res: Response) => {
    const registeredPeople = await PeopleService.registerPeople(req);

    return res.status(201).json(registeredPeople);
  };

  listAllPeoples = async (req: Request, res: Response) => {
    const peoples = await PeopleService.listAllPeople();

    return res.status(200).json(peoples);
  };

  deletePeople = async (req: Request, res: Response) => {
    await PeopleService.deletePeople(req);

    return res.status(204).send({});
  };

  updatePeople = async (req: Request, res: Response) => {
    const updatedPeople = await PeopleService.updatePeople(req);

    return res.status(200).json(updatedPeople);
  };
}

export default new PeopleController();
