// import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { visitedPageState } from "../../../component/stores";
// import { visitedPageState } from "../../component/stores";
// import { visitedPageState } from "../../../commons/stores";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../stores";

interface IUseMoveToPageReturn {
  visitedPage: string;
  onClickMoveToPage: (path: string) => (event: any) => void;
}
export const useMoveToPage = (): IUseMoveToPageReturn => {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => (event: any) => {
    //방법1
    setVisitedPage(path); //login page일때는 setVisitedPage하지 않도록 조건문 만들어주기
    //방법2
    // localStorage.setItem("visitedPage", path); //로컬스토리지 이용해서 주소 저장 가능!
    void router.push(path);
  };

  return {
    visitedPage, //==>오브젝트이므로 {key: value} 형식! =>원래는 { visitedPage: visitedPage, onClickMoveToPage: onClickMoveToPage } 임!!
    onClickMoveToPage, //==> onClickMoveToPage: onClickMoveToPage ==> shorthand-property
  };
};
