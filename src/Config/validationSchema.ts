import * as Yup from "yup";

// Validation for Login
export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

// Validation for submitting a task
export const validationSchemaTaskSubmit = Yup.object().shape({
  Name: Yup.string().required(),
  Duration: Yup.number().required(),
  Rating: Yup.number().required(),
  Date: Yup.date().required(),
});
