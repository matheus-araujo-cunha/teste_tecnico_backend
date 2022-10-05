import { Router } from "express";
import ContactController from "../controllers/contact.controller";
import { getContactByIdOr404 } from "../middlewares/getContactByIdOr404.middleware";
import { getPeopleByIdOr404 } from "../middlewares/getPeopleByIdOr404.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";
import { addContactSchema } from "../schemas/contacts.schema";

const router = Router();

export const contactRoutes = () => {
  router.post(
    "/:id/contacts/",
    validateSchema(addContactSchema),
    getPeopleByIdOr404,
    ContactController.addContact
  );
  router.get(
    "/contacts/:id/",
    getPeopleByIdOr404,
    ContactController.listAllContactOfPeople
  );
  router.delete(
    "/contacts/:id/",
    getContactByIdOr404,
    ContactController.removeContact
  );
  router.patch(
    "/contacts/:id/",
    getContactByIdOr404,
    ContactController.updateContact
  );

  return router;
};
