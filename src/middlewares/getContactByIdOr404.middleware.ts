import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errorHandler";
import InfoContactRepository from "../repositories/infoContact.repository";

const getContactByIdOr404 = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const contact = await InfoContactRepository.retrieve(id);

  if (!contact) {
    throw new ErrorHandler(404, "Contact people not found!");
  }

  req.contact = contact;

  return next();
};

export { getContactByIdOr404 };
