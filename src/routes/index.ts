import { Express } from "express";
import { contactRoutes } from "./contact.routes";
import { peopleRoutes } from "./people.routes";

export const appRoutes = (app: Express) => {
  app.use("/api/people", peopleRoutes());
  app.use("/api/people", contactRoutes());
};
