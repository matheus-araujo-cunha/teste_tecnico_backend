import { Request, Response } from "express";

class ContactController {
  addContact = async (req: Request, res: Response) => {};

  removeContact = async (req: Request, res: Response) => {};

  updateContact = async (req: Request, res: Response) => {};

  listAllContactOfPeople = async (req: Request, res: Response) => {};
}

export default new ContactController();
