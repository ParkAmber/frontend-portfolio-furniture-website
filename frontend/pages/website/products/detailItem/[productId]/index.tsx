import _ from "lodash";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useQueryBestProducts,
  useQueryFetchProduscts,
  useQueryProductOne,
} from "../../../../../src/component/hooks/query/useMutationFetchProducts";
import WebsiteDetailItem from "../../../../../src/component/unit/websiteDetail";
import { IQuery, IQueryFetchProductArgs, IQueryFetchProductsArgs } from "../../../../../src/commons/types/generated/types";
import { FETCH_PROUDUCT, FETCH_PROUDUCTS } from "../../../../../src/component/unit/list/productList.queries";
export type IDetailItemPropsSSR = {
  data?: Pick<IQuery, "fetchProduct"> | undefined;
  dataProducts?:Pick<IQuery, "fetchProducts"> | undefined;
 
};
export default function ProductDetailPage(props:IDetailItemPropsSSR) {
  const router = useRouter();
  const { data: dataBestProducts } = useQueryBestProducts();
  const [mainImg, setMainImg] = useState("");
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
        data={props.data}
        isBestItems={false}
        mainImg={mainImg}
        onClickImage={onClickImage}
        dataProducts={props.dataProducts}
        dataBestProducts={dataBestProducts}
      />

    </>
  );
}


export const getServerSideProps = async (context: any): Promise<any> => {
  const { productId } = context.params;

  try {
    const graphQLClient = new GraphQLClient('https://backend.amberpark.net/graphql');
    const data = await graphQLClient.request<IQuery, IQueryFetchProductArgs>(FETCH_PROUDUCT, {
      productId: String(productId),
    });
    const dataProducts = await graphQLClient.request<IQuery, IQueryFetchProductsArgs>(FETCH_PROUDUCTS, {
      search: data?.fetchProduct.files?.[0]?.name.split(".")[1],
    });
    return {
      props: {
        data,
        dataProducts
      },
    }; 
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};