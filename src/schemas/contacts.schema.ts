import * as yup from "yup";

const listContactsSchema = yup.array().of(
  yup
    .object()
    .shape({
      info: yup.string().required(),
      name: yup.string().required(),
    })
    .required()
);

export { listContactsSchema };
