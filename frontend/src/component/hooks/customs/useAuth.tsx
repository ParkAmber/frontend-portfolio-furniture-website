import { useEffect } from "react";
import { useRouter } from "next/router";
import type { ReactElement, ComponentType } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../stores/index";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
// import { getAccessToken } from "../../../component/libraries/getAccessToken";

export const useAuth = (): void => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    void getAccessToken().then((newAccessToken) => {
      console.log(newAccessToken);
      if (newAccessToken === undefined) {
        alert("Plaese login first!!");
        void router.push("/website/login");
      }
    });
  }, []);
};
