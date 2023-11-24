import _ from "lodash";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useQueryBestProductOne,
  useQueryBestProducts,
  useQueryFetchProduscts,
  useQueryProductOne,
} from "../../../../../src/component/hooks/query/useMutationFetchProducts";
import WebsiteDetailItem from "../../../../../src/component/unit/websiteDetail";
import { IQuery, IQueryFetchBestProductArgs, IQueryFetchProductsArgs } from "../../../../../src/commons/types/generated/types";
import { FETCH_BEST_PRODUCT, FETCH_BEST_PRODUCTS, FETCH_PROUDUCTS } from "../../../../../src/component/unit/list/productList.queries";
export type IDetailBestItemPropsSSR = {
  dataBest?: Pick<IQuery, "fetchBestProduct"> | undefined;
  dataProducts?:Pick<IQuery, "fetchProducts"> | undefined;
 
};
export default function ProductDetailPage(props: IDetailBestItemPropsSSR) {

  const router = useRouter();
  const { data: dataBestProducts } = useQueryBestProducts();

  const [mainImg, setMainImg] = useState("");
  const [title, setTitle] = useState("");
  const [mainId, setMainId] = useState("");

  const onClickImage =
    (image: string) =>
    (id: string): void => {
      setMainImg(image);
      setMainId(id);
    };
  return (
    <>
      <WebsiteDetailItem
        mainId={mainId}
        isBestItems={true}
        mainImg={mainImg}
        dataBest={props.dataBest}
        dataProducts={props.dataProducts}
        onClickImage={onClickImage}
        dataBestProducts={dataBestProducts}
      />

    </>
  );
}



export const getServerSideProps = async (context: any): Promise<any> => {
  const { productId } = context.params;

  try {
    const graphQLClient = new GraphQLClient('https://backend.amberpark.net/graphql');
    const dataBest = await graphQLClient.request<IQuery, IQueryFetchBestProductArgs>(FETCH_BEST_PRODUCT, {
      productId: String(productId),
    });
    const dataProducts = await graphQLClient.request<IQuery, IQueryFetchProductsArgs>(FETCH_PROUDUCTS, {
      search: dataBest?.fetchBestProduct.files?.[0]?.name.split(".")[1],
    });
    return {
      props: {
        dataBest: dataBest,
        dataProducts: dataProducts
      },
    };

    
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};