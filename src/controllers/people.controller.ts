import { Request, Response } from "express";

class PeopleController {
  registerPeople = async (req: Request, res: Response) => {};

  listAllPeoples = async (req: Request, res: Response) => {};

  deletePeople = async (req: Request, res: Response) => {};

  updatePeople = async (req: Request, res: Response) => {};
}

export default new PeopleController();
