import { usePagination } from "../../../hooks/customs/usePagination";
import { Page, PageContainer } from "./Paginations01.styles";
import { IPaginations01Props } from "./Paginations01.types";

export default function Paginations01(props: IPaginations01Props) {
  //  const { onClickPrevPage, onClickNextPage} = usePagination()

  return (
    <PageContainer>
      <Page onClick={props.onClickPrevPage}>{`<`}</Page>
      {new Array(5).fill(1).map(
        (_, index) =>
          props.startPage + index <= props.lastPage && (
            <Page
              key={props.startPage + index}
              onClick={props.onClickPage}
              id={String(props.startPage + index)}
              isActive={props.startPage + index === props.activedPage}>
              {props.startPage + index}
            </Page>
          )
      )}
      <Page onClick={props.onClickNextPage}>{`>`}</Page>
    </PageContainer>
  );
}
