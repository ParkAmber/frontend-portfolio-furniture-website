import { ApolloQueryResult } from "@apollo/client";
import { MouseEvent, useState } from "react";
import { IQuery } from "../../../commons/types/generated/types";
// import { IQuery } from "../../../../commons/types/generated/types";

interface IUsePaginationArgs {
  count: number | undefined;
  refetch: (
    variables?: Partial<any> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
}

export const usePagination = (args: IUsePaginationArgs) => {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = args.count != null ? Math.ceil(args.count / 9) : 0;

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    // console.log("hihih");
    const activedPage = Number(event.currentTarget.id);
    setActivedPage(activedPage);
    void args.refetch({ page: activedPage });
  };

  const onClickPrevPage = () => {
    // console.log("hihih");
    if (startPage === 1) return;
    setStartPage(startPage - 5);
    setActivedPage(startPage - 5);

    void args.refetch({ page: startPage - 5 });
  };

  const onClickNextPage = () => {
    if (startPage + 5 <= lastPage) {
      setStartPage(startPage + 5);
      setActivedPage(startPage + 5);
      void args.refetch({ page: startPage + 5 });
    }
  };

  return {
    startPage,
    activedPage,
    lastPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
