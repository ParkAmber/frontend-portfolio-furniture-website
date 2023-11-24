import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  visitedPageState,
} from "../../../src/component/stores/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IMutation,
  IMutationCreateUserArgs,
  IMutationLoginArgs,
} from "../../../src/commons/types/generated/types";
import Link from "next/link";
import { useMoveToPage } from "../../../src/component/hooks/customs/useMoveToPage";
import {
  CREATE_USER,
} from "../../../src/component/hooks/mutation/useMutationLogin";
import { schema } from "../../../src/commons/login/02-after.validation";

interface IFormData {
  name: string;
  email: string;
  pw: string;
}
export default function SignupPage() {
  const { onClickMoveToPage } = useMoveToPage();
  const { register, handleSubmit, formState } = useForm<IFormData>({
    //error messages
    resolver: yupResolver(schema),
    mode: "onChange", //onChange
  });

  const router = useRouter();

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickSignup = async (data: IFormData) => {
    try {
      const result = await createUser({
        variables: { email: data.email, password: data.pw, name: data.name },
      });
      alert("Thanks for signing up! Please log in!");
      void router.push("/website/login");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <>
      <div className='signup-section'>
        <h1>CREATE ACCOUNT</h1>
        <form onSubmit={handleSubmit(onClickSignup)} className='sign-up-con'>
          <div style={{ marginTop: "20px" }}>
            <p>NAME</p>{" "}
            <input type='text' {...register("name")} placeholder='NAME' />
            <p style={{ color: "red" }} className='error'>
              {formState.errors.name?.message}
            </p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p>EMAIL ADDRESS</p>{" "}
            <input
              type='text'
              {...register("email")}
              placeholder='EMAIL ADDRESS'
            />
            <p style={{ color: "red" }} className='error'>
              {formState.errors.email?.message}
            </p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p>PASSWORD</p>{" "}
            <input type='password' {...register("pw")} placeholder='PASSWORD' />
            <p style={{ color: "red" }} className='error'>
              {formState.errors.pw?.message}
            </p>{" "}
          </div>{" "}
          <div className='mt-60 signup-btns-con'>
            <button
              type='submit'
              style={{ backgroundColor: formState.isValid ? "#000" : "" }}
              className='signup-btn'>
              CREATE ACCOUNT
            </button>
            <button onClick={onClickMoveToPage("/website/products")}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
