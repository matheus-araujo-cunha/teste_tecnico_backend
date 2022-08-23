import { Contact } from "../entities/Contact";

export interface IRegisterContact {
  contact: string;
  info: string;
}

export interface IUpdateContact {
  contact?: string | Contact;
  info?: string;
}
