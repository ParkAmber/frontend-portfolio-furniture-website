import { useEffect } from "react";
import { useRouter } from "next/router";
import type { ReactElement, ComponentType } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../component/stores/index";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
// import { getAccessToken } from "../../../component/libraries/getAccessToken";

export const useAuth = (): void => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    // 1. 기존방식(refreshToken 이전)
    // console.log("지금은 브라우저다!!!!!");
    // const result = localStorage.getItem("accessToken");
    // console.log(result);
    // if (result) setAccessToken(result);

    // 2. 새로운방식(refreshToken 이후) - 새로고침 이후에도 토큰 유지할 수 있도록
    void getAccessToken().then((newAccessToken) => {
      console.log(newAccessToken);
      // setAccessToken(newAccessToken ?? "");
      if (newAccessToken === undefined) {
        alert("Plaese login first!!");
        void router.push("/website/login");
      }
    });
  }, []);
};
