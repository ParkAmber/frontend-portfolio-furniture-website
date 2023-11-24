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
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { InMemoryCache } from "@apollo/client";
import Layout from "../src/component/commons/layout";
import ApolloSetting from "../src/component/apollo";
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const GLOBAL_STATE = new InMemoryCache(); 
  return (
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
