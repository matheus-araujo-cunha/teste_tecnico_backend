import * as yup from "yup";

const createPeopleSchema = yup.object().shape({
  firstName: yup.string().required().lowercase(),
  lastName: yup.string().required().lowercase(),
});

const updatePeopleSchema = yup.object().shape({
  firstName: yup.string().optional().lowercase(),
  lastName: yup.string().optional().lowercase(),
});

const listAllPeoplesSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    contacts: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        info: yup.string().required(),
        contact: yup.string().required(),
      })
    ),
  })
);

const retrievePeopleSchema = yup.object().shape({
  id: yup.string().required(),
  firstName: yup.string().required().lowercase(),
  lastName: yup.string().required().lowercase(),
  contacts: yup.array().of(
    yup.object().shape({
      info: yup.string().required(),
      contact: yup.string().required(),
    })
  ),
});

export {
  createPeopleSchema,
  retrievePeopleSchema,
  listAllPeoplesSchema,
  updatePeopleSchema,
};
