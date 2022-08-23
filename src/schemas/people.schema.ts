import * as yup from "yup";

const createPeopleSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const listAllPeoplesSchema = yup.array().of(
  yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    infos: yup.array().of(
      yup.object().shape({
        info: yup.string().required(),
        name: yup.string().required(),
      })
    ),
  })
);

const retrievePeopleSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  infos: yup.array().of(
    yup.object().shape({
      info: yup.string().required(),
      name: yup.string().required(),
    })
  ),
});

export { createPeopleSchema, retrievePeopleSchema, listAllPeoplesSchema };
