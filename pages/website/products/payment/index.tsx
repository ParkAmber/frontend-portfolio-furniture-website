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
// import "../../../../styles/website.payment.css";
export default function PaymentPage() {
  useAuth();
  const purchasedItem = useRecoilValue(objectSelectorPurchase);
  const setPurchasedItem = useSetRecoilState(objectSelectorPurchase);
  // console.log(purchasedItem);
  // void router.push(visitedPage);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);
  // console.log(visitedPage, accessToken);
  const router = useRouter();
  useEffect(() => {
    const script = document.createElement("script"); //<script></script>태그 만들기
    script.src = "https://cdn.iamport.kr/v1/iamport.js";

    document.head.appendChild(script); //<head><script></script></head> ==><head> </head>태그 안에 <script></script>태그 넣어주기
    script.onload = () => {
      const requestData = {
        pg: "paypal_v2",
        pay_method: "paypal",
        amount: purchasedItem?.[0]?.price,
        country: "CA",
        lang: "en", // Set to 'en' for English
        // buyer_email: "gildong@gmail.com",
        // buyer_name: "구매자이름",
        // buyer_tel: "010-4242-4242",
        // buyer_addr: "서울특별시 강남구 신사동",
        // buyer_postcode: "01181",
        m_redirect_url: visitedPage,
        locale: "en_US",
      };

      if (window.IMP) {
        const { IMP } = window;
        IMP.init("imp03744404"); // Example: imp00000000
        IMP.loadUI("paypal-spb", requestData, function (rsp: any) {
          // console.log(rsp);
          // callback
          // if (rsp.success) {
          // 결제 성공 시 로직,
          try {
            axios
              .post(
                // "http://localhost:3000/graphql",
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
                  // console.log(response, response.data.data);
                  if (
                    response.data?.data?.createPointTransaction.status ===
                    "PAYMENT"
                  ) {
                    alert("Payment successful!");
                    router.push(visitedPage);
                  }
                  // Handle any additional logic here after a successful request
                }
              });
          } catch (error) {
            alert(error);
          }

          // } else {
          //   // 결제 실패 시 로직,
          //   alert('결제에 실패했습니다!!');
          // }
        });
      }
    };
  }, []);

 
  return (
    <>
      {/* <script src='https://cdn.iamport.kr/v1/iamport.js'></script> */}
      <script src='https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'></script>
      <script src='pay.js'></script>
      <div className='purchased-item'>
        <div className='purchased-item-img'>
          {purchasedItem[0]?.url &&
            <img
            src={`https://storage.cloud.google.com/webportfolio-backend-storage/${purchasedItem[0].url}`}
          />
          }
          
        </div>
        <p>
          PRODUCT: <span>{purchasedItem?.[0]?.name}</span>
        </p>
        <p>
          PRICE: $ <span>{purchasedItem?.[0]?.price}</span>
        </p>
      </div>
      <div
        className='portone-ui-container'
        data-portone-ui-type='paypal-spb'></div>
    </>
  );
}

