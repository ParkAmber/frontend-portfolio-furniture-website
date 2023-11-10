import { ChangeEvent, useState } from "react";
import _ from "lodash";
import { ApolloQueryResult } from "@apollo/client";
import { IQuery } from "../../../commons/types/generated/types";
// import { IQuery } from "../../../../commons/types/generated/types";

interface IUseSearchbarArgs {
  refetch: (
    variables?: Partial<any> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
  refetchProductsCount: (
    variables?: Partial<any> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
}

export const useSearchbar = (args: IUseSearchbarArgs) => {
  const [keyword, setKeyword] = useState("");

  const getDebounce = _.debounce((value: string) => {
    void args.refetch({ search: value, page: 1 });
    void args.refetchProductsCount({ search: value });
    setKeyword(value);
  }, 500);

  const onChangeSearchbar = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  return {
    keyword,
    onChangeSearchbar,
  };
};

// export const useSearchbar = (args: IUseSearchbarArgs) => {
//   const [keyword, setKeyword] = useState("");

//   const getDebounce = _.debounce((value: string) => {
//     void args.refetch({ search: value, page: 1 });
//     void args.refetchProductsCount({ search: value });
//     setKeyword(value);
//   }, 500);

//   const onChangeSearchbar = (category: string) => {
//     getDebounce(category);
//   };

//   return {
//     keyword,
//     onChangeSearchbar,
//   };
// };
