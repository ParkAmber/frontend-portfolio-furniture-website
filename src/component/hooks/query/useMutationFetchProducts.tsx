import { gql, useQuery, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateProductArgs,
  IQuery,
  IQueryFetchBestProductArgs,
  IQueryFetchProductArgs,
  IQueryFetchProductsArgs,
  IQueryFetchProductsByCategoryArgs,
  IQueryFetchProductsCountArgs,
} from "../../../commons/types/generated/types";
import {
  FETCH_BEST_PRODUCT,
  FETCH_BEST_PRODUCTS,
  FETCH_PROUDUCT,
  FETCH_PROUDUCTS,
  FETCH_PROUDUCTS_COUNT,
} from "../../unit/list/productList.queries";
export const FETCH_PROUDUCTS_BY_CATEGORY = gql`
  query fetchProductsByCategory($page: Int, $search: String) {
    fetchProductsByCategory(page: $page, search: $search) {
      id
      name
      description
      price
      productTags {
        id
        name
      }

      productCategory {
        id
        name
      }
      files {
        id
        name
      }
    }
  }
`;

export const useQueryProductsByCategory = (
  variables: IQueryFetchProductsByCategoryArgs
) => {
  const fetchByCategory = useQuery<
    Pick<IQuery, "fetchProductsByCategory">,
    IQueryFetchProductsByCategoryArgs
  >(FETCH_PROUDUCTS_BY_CATEGORY, {
    variables,
  });

  return fetchByCategory;
};

export const useQueryFetchProduscts = (variables?: IQueryFetchProductsArgs) => {
  const query = useQuery<
    Pick<IQuery, "fetchProducts">,
    IQueryFetchProductsArgs
  >(FETCH_PROUDUCTS, {
    variables,
  });

  return query;
};
export const useQueryProductsCounts = () => {
  const fetchProductsCount = useQuery<
    Pick<IQuery, "fetchProductsCount">,
    IQueryFetchProductsCountArgs
  >(FETCH_PROUDUCTS_COUNT);

  return fetchProductsCount;
};

export const useQueryProductOne = (variables: IQueryFetchProductArgs) => {
  const queryOne = useQuery<
    Pick<IQuery, "fetchProduct">,
    IQueryFetchProductArgs
  >(FETCH_PROUDUCT, {
    variables,
  });

  return queryOne;
};

export const useQueryBestProducts = () => {
  const fetchBestProducts = useQuery<
    Pick<IQuery, "fetchBestProducts">,
    IQueryFetchBestProductArgs
  >(FETCH_BEST_PRODUCTS);

  return fetchBestProducts;
};

export const useQueryBestProductOne = (
  variables: IQueryFetchBestProductArgs
) => {
  const queryBestOne = useQuery<
    Pick<IQuery, "fetchBestProduct">,
    IQueryFetchBestProductArgs
  >(FETCH_BEST_PRODUCT, {
    variables,
  });

  return queryBestOne;
};
// const { data: dataProductCount, refetch: refetchBoardsCount } = useQuery<
// Pick<IQuery, "fetchProductsCount">,
// IQueryFetchProductsCountArgs
// >(FETCH_PROUDUCTS_COUNT);
// console.log(dataProductCount);
