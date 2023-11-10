import type { ChangeEvent, FormEvent } from "react";

//eslint에서, onClick={}안에는 async/await 같은 비동기 함수 넣을 수 없음!(그냥 함수만 가능)
//==> 그냥 함수를 하나 만들어 주고, 그걸로 비동기 함수감싸줌!!(그냥 함수인 척 해주기ㅎㅎ)
export const wrapAsync =
  //들어올 event 타입 잘 모르겠으면 e: any 나 generic으로 해줌!!
  //prettier-ignore
  <E>(func: (e: E) => Promise<void>) => (e: E) => {
      //()=> void (타입으로 함수타입 넣을때!!)
      void func(e);
    };
// (func: (e: ChangeEvent<HTMLInputElement>) => Promise<void>) =>
// (e: ChangeEvent<HTMLInputElement>) => {
//   //()=> void (타입으로 함수타입 넣을때!!)
//   void func(e);
// };

//<form>테그에서 쓸데없이 페이지이동하는거 막아주기 위해 감싸주는 함수
export const wrapFormAsync =
  (func: () => Promise<void>) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //<form>테그에서 쓸데없이 페이지이동하는거 막아줌
    //()=> void (타입으로 함수타입 넣을때!!)
    void func();
  };
