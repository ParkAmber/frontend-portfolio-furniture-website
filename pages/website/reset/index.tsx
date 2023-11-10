import Link from "next/link";
import { useMoveToPage } from "../../../src/component/hooks/customs/useMoveToPage";
import { ChangeEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_LOGIN_USER } from "../../../src/component/hooks/query/useMutationFetchId";
import { useRouter } from "next/router";
import { isValidAttribute } from "dompurify";
import { useMutationUpdatePwd } from "../../../src/component/hooks/mutation/useMutationLogin";

export default function ResetPage() {
  const router = useRouter();
  const [getEmail, { loading, error, data }] = useLazyQuery(FETCH_LOGIN_USER);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [userId, setUserId] = useState("");
  const { onClickMoveToPage } = useMoveToPage();

  const [resetPwd] = useMutationUpdatePwd();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const onClickFetchId = () => {
    if (email.length < 1) {
      setEmailError("please enter your email");
      return;
    } else if (!email.includes("@")) {
      setEmailError("Not in a valid email format");
      return;
    } else {
      setEmailError("");
    }
    getEmail({ variables: { email } });
    // console.log(data, error?.message);

    if (error?.message) {
      alert("there is no valid email");
      return;
    }
    setIsValid(true);
    // console.log(data, data?.fetchLoginUser?.id);
    setUserId(data?.fetchLoginUser?.id);
  };
  // console.log(data, data?.fetchLoginUser?.id, error?.message);

  const onClickPwd = async () => {
    // console.log(userId);
    if (pw.length < 1) {
      setPwError("please enter your password");
      return;
    } else if (pw.length < 4) {
      setPwError("Please enter at least 4 characters.");
      return;
    } else if (pw.length > 15) {
      setPwError("Please enter no more than 15 characters");
      return;
    } else {
      setPwError("");
    }

    try {
      const result = await resetPwd({
        variables: {
          productId: data?.fetchLoginUser?.id,
          password: String(pw),
        },
      });
      // console.log(result);
      alert("Your password has been updated successfully");
      router.push("/website/login");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className='reset-section'>
        {/* <button onClick={() => getEmail({ variables: { email } })}>
        Click me!
      </button> */}
        {!isValid && (
          <>
            <div style={{ marginTop: "20px" }} className='sign-up-con'>
              <p>EMAIL ADDRESS</p>
              <input
                type='text'
                onChange={onChangeEmail}
                placeholder='EMAIL ADDRESS'
              />
              <p className='error'>{emailError}</p>
            </div>
            <div className='reset-btns-con'>
              <button onClick={onClickFetchId} className='reset-btn'>
                SUBMIT
              </button>{" "}
              <button onClick={onClickMoveToPage("/website/products")}>
                CANCEL
              </button>
            </div>{" "}
          </>
        )}
        {data?.fetchLoginUser?.id && (
          <>
            <div style={{ marginTop: "20px" }} className='sign-up-con'>
              <p>NEW PASSWORD</p>
              <input
                type='password'
                onChange={onChangePw}
                placeholder='PASSWORD'
              />
              <p className='error'>{pwError}</p>
            </div>
            <div className='reset-btns-con'>
              <button onClick={onClickPwd} className='reset-btn'>
                SUBMIT
              </button>{" "}
              <button onClick={onClickMoveToPage("/website/products")}>
                CANCEL
              </button>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}
