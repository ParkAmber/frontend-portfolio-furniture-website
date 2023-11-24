import ProductListUI from "./productList.presenter";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { MouseEvent, ChangeEvent } from "react";
import {
  FETCH_PROUDUCTS,
  FETCH_PROUDUCTS_COUNT,
} from "./productList.queries";
import _ from "lodash";
import {
  IQuery,
  IQueryFetchProductsArgs,
  IQueryFetchProductsCountArgs,
} from "../../../commons/types/generated/types";
export default function ProductList() {
  const [isClickedpage, setIsClickedpage] = useState(1);
  const [startPage, setstartPage] = useState(1);
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const [search, setSearch] = useState("");
  const { data: dataProducts, refetch } = useQuery<
    Pick<IQuery, "fetchProducts">,
    IQueryFetchProductsArgs
  >(FETCH_PROUDUCTS);

  if (dataProducts?.fetchProducts !== undefined) {
    console.log(dataProducts?.fetchProducts);
  }
  const { data: dataProductCount, refetch: refetchBoardsCount } = useQuery<
    Pick<IQuery, "fetchProductsCount">,
    IQueryFetchProductsCountArgs
  >(FETCH_PROUDUCTS_COUNT);
  console.log(dataProductCount);
  const lastPage = Math.ceil((dataProductCount?.fetchProductsCount ?? 10) / 10);

  const onClickPage = (e: MouseEvent<HTMLButtonElement>): void => {
    void refetch({ page: Number(e.currentTarget.id) }); 
    console.log(e.currentTarget.id);
    setIsClickedpage(Number(e.currentTarget.id));
  };
  const getDebounce = _.debounce((aaa) => {
    void refetch({ search: aaa, page: 1 });
    void refetchBoardsCount({ search: aaa });
    setKeyword(aaa);
  }, 500);

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setstartPage(startPage - 10);
    setIsClickedpage(startPage - 10);
    void refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setstartPage(startPage + 10);
      setIsClickedpage(startPage + 10);
      void refetch({ page: startPage + 10 });
    }
  };
  //
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearch = (): void => {
    getDebounce(search);
  };

  const starPoint = [0, 1, 2, 3, 4];

  const [isClicked, setIsClicked] = useState("forSale");
  const onClickMoveToDetail = (aa: string) => () => {
    router.push(`/designer/products/detail/${aa}`);
  };
  return (
    <ProductListUI
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onChangeSearch={onChangeSearch}
      onClickSearch={onClickSearch}
      dataProducts={dataProducts}
      onClickMoveToDetail={onClickMoveToDetail}
      starPoint={starPoint}
      onClickPrevPage={onClickPrevPage}
      startPage={startPage}
      lastPage={lastPage}
      onClickPage={onClickPage}
      isClickedpage={isClickedpage}
      onClickNextPage={onClickNextPage}
      keyword={keyword}
    />
  );
}
