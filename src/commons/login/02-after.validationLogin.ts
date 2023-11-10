import * as yup from "yup";
export const schema = yup.object({
  // ** 에러 메세지들
  // name: yup.string().required("please enter your name"),
  // title: yup.string().required("title을 입력해주세여"),
  // contents: yup.string().required("contents를 입력해주세여"),

  // //이메일 검증
  email: yup
    .string()
    .email("Not in a valid email format")
    .required("please enter your email"),
  // //비번 검증
  pw: yup
    .string()
    .min(4, "Please enter at least 4 characters.")
    .max(15, "Please enter no more than 15 characters")
    .required("please enter your password"),

  // phone: yup
  //   .string()
  //   .matches(/^\d{3}-\d{3,4}-\d{4}$/, "형식에 맞게 입력해라")
  //   .required("phone를 입력해주세여"),
});
