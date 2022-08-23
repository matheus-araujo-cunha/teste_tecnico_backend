import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errorHandler";
import PeopleRepository from "../repositories/people.repository";

const getPeopleByIdOr404 = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const people = await PeopleRepository.retrieve(id);

  if (!people) {
    throw new ErrorHandler(404, "People not found!");
  }

  req.people = people;

  return next();
};

export { getPeopleByIdOr404 };
