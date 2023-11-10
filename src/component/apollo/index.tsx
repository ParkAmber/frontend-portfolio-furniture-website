import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
const GLOBAL_STATE = new InMemoryCache(); //랜더 되도 이건 유지되게 상수로 저장해준다음, 이 변수를 가져다 써줘야 유지 됨(global state에 있는 것들 페이지 이동되도 캐싱 유지 되게!!)!!
interface IApolloSettingProps {
  children: JSX.Element;
}
import { useRecoilState, useRecoilValueLoadable } from "recoil";
//   import { getAccessToken } from "../libraries/getAccessToken";
import { accessTokenState, restoreAccessTokenLoadable } from "../stores";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../commons/libraries/getAccessToken";
export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);
  // const client = new ApolloClient({
  //   uri: "http://backendonline.codebootcamp.co.kr/graphql",
  //   // uri: "https://backend-practice.codebootcamp.co.kr/graphql/",
  //   cache: new InMemoryCache(),
  // });
  //3. pre-rendering x ==> useEffect방법(제일 깔끔함!!)
  useEffect(() => {
    // console.log("browser!");
    // const result = localStorage.getItem("accessToken"); //=>1.  임시 방법

    // void getAccessToken().then((newAccessToken) => {
    //   console.log(newAccessToken);
    //   setAccessToken(newAccessToken ?? "");
    // }); //=> 2. refresh token
    // console.log(accessToken);
    void aaa.toPromise().then((newAccessToken) => {
      // console.log(newAccessToken);
      setAccessToken(newAccessToken ?? "");
    });
  }, []);
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    //1. error 캐치(어떤 에러가 났는지..)
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        //1-2 graphQLErrors돌면서 해당 에러가 토큰만료 에러(UNAUTHENTICATED)인지 체크!
        if (err.extensions.code === "UNAUTHENTICATED") {
          //fromPromise와 flatMap은 나중에 배울것임!
          return fromPromise(
            //2. refreshToken으로 accessToken 재발급 받기!=> 이부분은 따로 함수로 분리래줬음!!
            //=> mutatione등은(use어쩌고) apollo 세팅이 밑에 코드에서 아직 하고있기때문에 여기선 사용할수 없음!! => apollo 사용하지 말고 graphql-request 다운받아서 사용해주기!!
            // const graphQLClient = new GraphQLClient(
            //   "http://backend-practice.codebootcamp.co.kr/graphql"
            // );
            // const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
            // const newAccessToken = result.restoreAccessToken.accessToken;
            ////setAccessToken(newAccessToken)

            //=> 2번 과정 끝나고 then으로 받아 다음 과정(3번과정) 실행하기!
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");
              //3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기!!
              // operation.getContext().headers; //==>headers=> {Bearer ~~어쩌구} 등 들어있음!!
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, //3-1 기존의 Authorization들어있음! => Authorization: Bearer ~~~ ==>만료된 토큰이 추가되어있는 상태
                  Authorization: `Bearer ${newAccessToken}`, //3-2 토큰만 새걸로 바꾸주기! ==>위의...operation.getContext().headers에 들어있는 기존의 `Bearer ${accessToken}`를 덮어씀!!
                },
              });
            })
          ).flatMap(
            () => forward(operation) //3-3 방금 수정한 쿼리 재요청하기!
          );
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    // uri: "http://localhost:3000/graphql",
    uri: "https://backend.amberpark.net/graphql",
    // uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    // headers: { "Apollo-Require-Preflight": "true" },
    headers: {
      "Apollo-Require-Preflight": "true",
      "Access-Control-Allow-Credentials": "true",
      // "Content-Type": "application/json",
      // "x-apollo-operation-name": "YourOperationName",
      // "apollo-require-preflight": "true",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", //cookie에 저장될수있게 headers에 cookie포함시킴!
  });
  const client = new ApolloClient({
    //uri: "http://practice.codebootcamp.co.kr/graphql/",
    // uri: "http://backend-practice.codebootcamp.co.kr/graphql/",
    link: ApolloLink.from([errorLink, uploadLink]),
    //cache: new InMemoryCache(), //컴퓨터의 메모리에 백앤드에서 받아온 데이터 임시저장
    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   ApolloLink,
//   fromPromise,
// } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
// import { useEffect } from "react";
// import { useRecoilState, useRecoilValueLoadable } from "recoil";
// // import {
// //   accessTokenState,
// //   restoreAccessTokenLoadable,
// // } from "../../../commons/stores";
// import { onError } from "@apollo/client/link/error";
// // import { getAccessToken } from "../../../commons/libraries/getAccessToken";
// import { accessTokenState, restoreAccessTokenLoadable } from "../stores";
// import { getAccessToken } from "../libraries/getAccessToken";
// // import { gql, GraphQLClient } from "graphql-request";

// const GLOBAL_STATE = new InMemoryCache(); //랜더 되도 이건 유지되게 상수로 저장해준다음, 이 변수를 가져다 써줘야 유지 됨(global state에 있는 것들 페이지 이동되도 캐싱 유지 되게!!)!!

// interface IApolloSettingProps {
//   children: JSX.Element;
// }

// export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
//   const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
//   const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable); //qpi에서 받아온 거 global state로 공유할수있음
//   // "http://backend-practice.codebootcamp.co.kr/graphql/" 이 주소에 파일 업로드 기능 추가하기

//   //1. brower일떼 실행시키기! ==> pre-rendering==> process.browser
//   // if (process.browser) {
//   //   console.log("지금은 브라우저다!");
//   //   const result = localStorage.getItem("accessToken");
//   //   setAccessToken(result ?? "");
//   //   console.log(result);
//   // } else {
//   //   console.log(
//   //     "지금은 아직 프론트앤드 서버다!! ==> 즉,yarn dev로 실행시킨 프로그램 내부다"
//   //   );
//   // }

//   // ||
//   // ||
//   // ||

//   //2. pre-rendering==> typeof window
//   // if (typeof window !== "undefined") {
//   //   console.log("지금은 브라우저다!");
//   // } else {
//   //   console.log(
//   //     "지금은 아직 프론트앤드 서버다!! ==> 즉,yarn dev로 실행시킨 프로그램 내부다"
//   //   );
//   // }

//   // ||
//   // ||
//   // ||

//   //3. pre-rendering x ==> useEffect방법(제일 깔끔함!!)
//   useEffect(() => {
//     console.log("지금은 브라우저다!");
//     // const result = localStorage.getItem("accessToken"); //=>1.  임시 방법

//     void getAccessToken().then((newAccessToken) => {
//       console.log(newAccessToken);
//       setAccessToken(newAccessToken ?? "");
//     }); //=> 2. refresh token
//     // void aaa.toPromise().then((newAccessToken22) => {
//     //   setAccessToken(newAccessToken22 ?? "");
//     // });
//   }, []);

//   // const RESTORE_ACCESS_TOKEN = gql`
//   //   mutation {
//   //     restoreAccessToken {
//   //       accessToken
//   //     }
//   //   }
//   // `;

//   //==> refresh token발급받기!!=> 이건 local storage말고 cookie에 받아오게될것임!.cookie에 저장도 되게 하려면, "https://~~"로 해줘야함!!
//   //graphQLErrors : 에러들을 캐치해줍니다., operation : 방금전에 실패했던 쿼리가 뭐였는지 알아둡니다., forward : 실패했던 쿼리들을 재전송 합니다.
//   const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//     //1. error 캐치(어떤 에러가 났는지..)
//     if (typeof graphQLErrors !== "undefined") {
//       for (const err of graphQLErrors) {
//         //1-2 graphQLErrors돌면서 해당 에러가 토큰만료 에러(UNAUTHENTICATED)인지 체크!
//         if (err.extensions.code === "UNAUTHENTICATED") {
//           //fromPromise와 flatMap은 나중에 배울것임!
//           return fromPromise(
//             //2. refreshToken으로 accessToken 재발급 받기!=> 이부분은 따로 함수로 분리래줬음!!
//             //=> mutatione등은(use어쩌고) apollo 세팅이 밑에 코드에서 아직 하고있기때문에 여기선 사용할수 없음!! => apollo 사용하지 말고 graphql-request 다운받아서 사용해주기!!
//             // const graphQLClient = new GraphQLClient(
//             //   "http://backend-practice.codebootcamp.co.kr/graphql"
//             // );
//             // const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
//             // const newAccessToken = result.restoreAccessToken.accessToken;
//             ////setAccessToken(newAccessToken)

//             //=> 2번 과정 끝나고 then으로 받아 다음 과정(3번과정) 실행하기!
//             getAccessToken().then((newAccessToken) => {
//               setAccessToken(newAccessToken ?? "");
//               //3. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기!!
//               // operation.getContext().headers; //==>headers=> {Bearer ~~어쩌구} 등 들어있음!!
//               operation.setContext({
//                 headers: {
//                   ...operation.getContext().headers, //3-1 기존의 Authorization들어있음! => Authorization: Bearer ~~~ ==>만료된 토큰이 추가되어있는 상태
//                   Authorization: `Bearer ${newAccessToken}`, //3-2 토큰만 새걸로 바꾸주기! ==>위의...operation.getContext().headers에 들어있는 기존의 `Bearer ${accessToken}`를 덮어씀!!
//                 },
//               });
//             })
//           ).flatMap(
//             () => forward(operation) //3-3 방금 수정한 쿼리 재요청하기!
//           );
//         }
//       }
//     }
//   });

//   const uploadLink = createUploadLink({
//     // uri: "https://backendonline.codebootcamp.co.kr/graphql",
//     uri: "https://backend-practice.codebootcamp.co.kr/graphql",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     credentials: "include", //cookie에 저장될수있게 headers에 cookie포함시킴!
//   });

//   const client = new ApolloClient({
//     //uri: "http://practice.codebootcamp.co.kr/graphql/",
//     // uri: "http://backend-practice.codebootcamp.co.kr/graphql/",
//     link: ApolloLink.from([errorLink, uploadLink]),
//     //cache: new InMemoryCache(), //컴퓨터의 메모리에 백앤드에서 받아온 데이터 임시저장(= 캐시)
//     cache: GLOBAL_STATE,
//   });

//   // ==>@ts-ignore: ts 무시하고싶을때!
//   //prettier-ignore
//   return (
//     <ApolloProvider client={client}>
//       {props.children}
//     </ApolloProvider>
//   )
// }
