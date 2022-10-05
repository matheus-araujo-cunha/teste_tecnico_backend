import { InfoContact } from "../entities/InfoContact";

const serializerContact = (contact: InfoContact) => {
  const serialized = {
    id: contact.id,
    info: contact.info,
    contact: contact.name.contact,
  };

  return serialized;
};

export { serializerContact };
