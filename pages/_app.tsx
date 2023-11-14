// import "../styles/globals.css";
import "../styles/style.css";
import "../styles/new.css";
import "../styles/detail.css";
import "../styles/website.main.css";
import "../styles/website.list.css";
import "../styles/website.detail.css";
import "../styles/website.payment.css";
import "../styles/website.cart.css";
import "../styles/website.login.css";
import "../styles/portfolio.main.css";
// import "../styles/detailComment.css";
import { AppProps } from "next/app";

import { RecoilRoot } from "recoil";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Layout from "../src/component/commons/layout";
import ApolloSetting from "../src/component/apollo";
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  // const client = new ApolloClient({
  //   uri: "http://localhost:3000/graphql",
  //   cache: new InMemoryCache(),
  // });
  const GLOBAL_STATE = new InMemoryCache(); //랜더 되도 이건 유지되게 상수로 저장해준다음, 이 변수를 가져다 써줘야 유지 됨(global state에 있는 것들 페이지 이동되도 캐싱 유지 되게!!)!!

  // const uploadLink = createUploadLink({
  //   uri: "https://backend.amberpark.net/graphql",
  //   headers: { "Content-Type": "application/json" },
  //   // headers: { "Apollo-Require-Preflight": "true" },
  //   // uri: "https://backend-practice.codebootcamp.co.kr/graphql",
  //   // headers: {
  //   //   Authorization: `Bearer ${accessToken}`,
  //   // },
  //   // credentials: "include", //cookie에 저장될수있게 headers에 cookie포함시킴!
  // });
  // const client = new ApolloClient({
  //   //uri: "http://practice.codebootcamp.co.kr/graphql/",
  //   // uri: "http://backend-practice.codebootcamp.co.kr/graphql/",
  //   link: ApolloLink.from([uploadLink]),
  //   //cache: new InMemoryCache(), //컴퓨터의 메모리에 백앤드에서 받아온 데이터 임시저장
  //   cache: GLOBAL_STATE,
  // });
  return (
    // <RecoilRoot>
    //   <ApolloProvider client={client}>
    //     <Layout>
    //       <Component {...pageProps} />
    //     </Layout>
    //   </ApolloProvider>
    // </RecoilRoot>
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </ApolloSetting>
    </RecoilRoot>
  );
}
