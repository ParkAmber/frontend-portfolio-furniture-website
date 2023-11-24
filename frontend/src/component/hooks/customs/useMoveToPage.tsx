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

    setVisitedPage(path);
    void router.push(path);
  };

  return {
    visitedPage, 
    onClickMoveToPage, 
  };
};
