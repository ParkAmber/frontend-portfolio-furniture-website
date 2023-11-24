import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

import { useRecoilState } from "recoil";
import {
  accessTokenState,
  visitedPageState,
} from "../../../src/component/stores/index";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  IMutation,
  IMutationLoginArgs,
} from "../../../src/commons/types/generated/types";
import Link from "next/link";
import { useMoveToPage } from "../../../src/component/hooks/customs/useMoveToPage";
import { schema } from "../../../src/commons/login/02-after.validationLogin";


const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
interface IFormData {
  email: string;
  pw: string;
}

const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
        email: {
            type: "please enter your email",
            message: "This is required.",
          },
        }
      : {},
  }
}
export default function LoginPage() {
  const { onClickMoveToPage } = useMoveToPage();
  const { register, handleSubmit, formState } = useForm<IFormData>({
    //에러 메세지들
    resolver: yupResolver(schema),
    // resolver,
    mode: "onChange", //onChange될때마다 채크해서 에러 메세지들 띄우기
  });

  const router = useRouter();

  const [login] = useMutation<Pick<IMutation, "login">, IMutationLoginArgs>(
    LOGIN
  );

  const [access, setAccessToken] = useRecoilState(accessTokenState);
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickLogin = async (data: IFormData) => {
  
    try {
      //1. get access token 받아오기
      const result = await login({
        variables: { email: data.email, password: data.pw },
      });

      const accessToken = result.data?.login;
      //2. store in global state
      if (accessToken === undefined) {
        alert("Login fail!! please try again..");
        return;
      }
      setAccessToken(accessToken);
  
      //3.redirect
      void router.push("/website");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <>
      <div className='login-section'>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(onClickLogin)} className='sign-up-con'>
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
          <p className='forget-account'>
            <span>
              <Link href='/website/reset'>
                <a>Forgot password?</a>
              </Link>
            </span>
          </p>
          <div className='mt-60 login-btns-con'>
            <button
              style={{ backgroundColor: formState.isValid ? "#000" : "" }}
              className='login-btn'>
              LOGIN
            </button>
            <button onClick={onClickMoveToPage("/website/products")}>
              CANCEL
            </button>
          </div>
        </form>
        <p className='cretae-account'>
          Don’t have an account?{" "}
          <span>
            <Link href='/website/signup'>
              <a>Create account</a>
            </Link>
          </span>
        </p>
        {/* <hr /> */}
        <p className='google-login-p'>OR</p>
        <div className='google-login'>
          {" "}
          <div>
            <img src='/google.png' className='social-icon' />
            <a href='https://backend.amberpark.net/login/google'>
              Login with Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
