import * as yup from "yup";

export const scoreSchema = yup.object({
  score: yup.string().required("Please enter your score"),
});
