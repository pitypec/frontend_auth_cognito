import * as yup from "yup";

export const signInSchema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});
export const signUpSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  fullName: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Name is required").max(11),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Too Short!"),
  confirmPassword: yup
    .string()
    .required("Please enter your password")
    .min(8, "Too Short!"),
});
