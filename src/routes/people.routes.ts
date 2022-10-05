import { Router } from "express";
import PeopleController from "../controllers/people.controller";
import { getPeopleByIdOr404 } from "../middlewares/getPeopleByIdOr404.middleware";
import validateSchema from "../middlewares/validateSchema.middleware";
import {
  createPeopleSchema,
  updatePeopleSchema,
} from "../schemas/people.schema";

const router = Router();

export const peopleRoutes = () => {
  router.post(
    "",
    validateSchema(createPeopleSchema),
    PeopleController.registerPeople
  );
  router.get("/", PeopleController.listAllPeoples);
  router.delete("/:id/", getPeopleByIdOr404, PeopleController.deletePeople);
  router.patch(
    "/:id/",
    getPeopleByIdOr404,
    validateSchema(updatePeopleSchema),
    PeopleController.updatePeople
  );

  return router;
};
