import * as yup from "yup";

const listContactsSchema = yup.array().of(
  yup
    .object()
    .shape({
      id: yup.string().required(),
      info: yup.string().required(),
      contact: yup.string().required(),
    })
    .required()
);

const addContactSchema = yup
  .object()
  .shape({
    id: yup.string(),
    info: yup.string().required(),
    contact: yup.string().required(),
  })
  .required();

export { listContactsSchema, addContactSchema };
