import * as Yup from "yup";

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

export const validationSchemaAccount = Yup.object().shape({
  Name: Yup.string(),
});

export const validationSchemaTaskSubmit = Yup.object().shape({
  Name: Yup.string().required(),
  Duration: Yup.number().required().min(1),
  Rating: Yup.number().required().min(1).max(5),
  Date: Yup.date().required(),
});
