import { Request, Response } from "express";
import ContactService from "../services/contact.service";

class ContactController {
  addContact = async (req: Request, res: Response) => {
    const contacts = await ContactService.addContact(req);

    return res.status(201).json(contacts);
  };

  removeContact = async (req: Request, res: Response) => {
    await ContactService.deleteContact(req);

    return res.status(204).json({});
  };

  updateContact = async (req: Request, res: Response) => {
    const contactsUpdated = await ContactService.updateContact(req);

    return res.status(200).json(contactsUpdated);
  };

  listAllContactOfPeople = async (req: Request, res: Response) => {
    const contacts = await ContactService.retrieveContactsOfPeople(req);

    return res.status(200).json(contacts);
  };
}

export default new ContactController();
