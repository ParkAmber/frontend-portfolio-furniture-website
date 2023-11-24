declare const window: typeof globalThis & {
  IMP: any;
};
import { ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accessTokenState,
  objectSelectorPurchase,
  visitedPageState,
} from "../../../../src/component/stores";
import { useAuth } from "../../../../src/component/hooks/customs/useAuth";
import { getAccessToken } from "../../../../src/commons/libraries/getAccessToken";

export default function PaymentPage() {
  useAuth();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const router = useRouter();
  useEffect(() => {
    const totalAmount = localStorage.getItem("total");
 
    const script = document.createElement("script"); //<script></script>tag
    script.src = "https://cdn.iamport.kr/v1/iamport.js";

    document.head.appendChild(script); //<head><script></script></head> 
    script.onload = () => {
      const requestData = {
        pg: "paypal_v2",
        pay_method: "paypal",
        amount: totalAmount,
        country: "CA",
        lang: "en", // Set to 'en' for English
        m_redirect_url: visitedPage,
        locale: "en_US",
      };

      if (window.IMP) {
        const { IMP } = window;
        IMP.init("imp03744404"); // Example: imp00000000
        IMP.loadUI("paypal-spb", requestData, function (rsp: any) {
          try {
            axios
              .post(
                "https://backend.amberpark.net/graphql",
                {
                  query: `
                  mutation {
                    createPointTransaction(impUid: "${rsp.imp_uid}", amount: ${requestData.amount}){
                      id
                      status
                    }
                  }
                `,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => {
                if (response.data) {
                  if (
                    response.data?.data?.createPointTransaction.status ===
                    "PAYMENT"
                  ) {
                    alert("Payment successful!");
                    router.push("/website/products");
                  }
                  // Handle any additional logic here after a successful request
                }
              });
          } catch (error) {
            alert(error);
          }
        });
      }
    };
  }, []);

  return (
    <>
      <script src='https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'></script>

      <div
        className='portone-ui-container'
        data-portone-ui-type='paypal-spb'></div>
    </>
  );
}
