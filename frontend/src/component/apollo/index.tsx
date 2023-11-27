import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
const GLOBAL_STATE = new InMemoryCache(); 
interface IApolloSettingProps {
  children: JSX.Element;
}
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { accessTokenState, restoreAccessTokenLoadable } from "../stores";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../commons/libraries/getAccessToken";
export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  useEffect(() => {
    void aaa.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
  }, []);
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    //1. error catch
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        //2 graphQLErrors => check. if the error is "UNAUTHENTICATED"!
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              //3. re-fetch
              // operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, //3-1 => Authorization: Bearer ~~~ 
                  Authorization: `Bearer ${newAccessToken}`, //3-2 change to new token! 
                },
              });
            })
          ).flatMap(
            () => forward(operation) //3-3 
          );
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "https://backend.amberpark.net/graphql",
    headers: {
      "Apollo-Require-Preflight": "true",
      "Access-Control-Allow-Credentials": "true",
      // "Content-Type": "application/json",
      // "x-apollo-operation-name": "YourOperationName",
      // "apollo-require-preflight": "true",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", 
  });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

