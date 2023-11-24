import * as yup from "yup";
export const schema = yup.object({
  email: yup
    .string()
    .email("Not in a valid email format")
    .required("please enter your email"),
  pw: yup
    .string()
    .min(4, "Please enter at least 4 characters.")
    .max(15, "Please enter no more than 15 characters")
    .required("please enter your password"),
});
