import * as Yup from "yup";

export const generalInfoValidation = Yup.object({
  firstName: Yup.string().required().min(1),
  lastName: Yup.string().required().min(1),
  birthday: Yup.string(),
  contacts: Yup.array(
    Yup.object({
      title: Yup.string().required(),
      value: Yup.string().required(),
    })
  ).min(1),
});
