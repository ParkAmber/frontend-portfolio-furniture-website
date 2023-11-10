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
  // const { data } = useQueryProductOne({
  //   productId: String(router.query.productId),
  // });
  // const { data: dataProducts } = useQueryFetchProduscts({
  //   search: data?.fetchProduct.files?.[0]?.name.split(".")[1],
  // });

  const { data: dataBestProducts } = useQueryBestProducts();
  // console.log(dataBestProducts);

  const [mainImg, setMainImg] = useState("");
  const [mainId, setMainId] = useState("");
  // console.log(dataProducts);
  // console.log(
  //   router.query.productId,
  //   data?.fetchProduct.files?.[0]?.name,
  //   data?.fetchProduct.files?.[0]?.name.split(".")[1],
  //   mainImg
  // );
  const onClickImage =
    (image: string) =>
    (id: string): void => {
      // console.log(image, id);
      setMainImg(image);
      setMainId(id);
    };
  // const onClickMoveToDetail = (path: string) => () => {
  //   router.push(`/website/products/detailBestItem/${path}`);
  // };
  return (
    <>
      <WebsiteDetailItem
        mainId={mainId}
        data={props.data}
        isBestItems={false}
        mainImg={mainImg}
        // mainId={mainId}
        onClickImage={onClickImage}
        // onClickMoveToDetail={onClickMoveToDetail}
        dataProducts={props.dataProducts}
        dataBestProducts={dataBestProducts}
      />

    </>
  );
}


//만약 서버사이드 렌더링을 하는 페이지라면, yarn build:ssg해서 out 폴더 생성 불가! => next.config.js애서 exportPathMap으로 그 페이지 재외시키기!
export const getServerSideProps = async (context: any): Promise<any> => {
  const { productId } = context.params;

  try {
    const graphQLClient = new GraphQLClient('https://backend.amberpark.net/graphql');

   // const { data } = useQueryProductOne({
  //   productId: String(router.query.productId),
  // });
  // const { data: dataProducts } = useQueryFetchProduscts({
  //   search: data?.fetchProduct.files?.[0]?.name.split(".")[1],
  // });


    const data = await graphQLClient.request<IQuery, IQueryFetchProductArgs>(FETCH_PROUDUCT, {
      productId: String(productId),
    });
    // console.log(data)
    const dataProducts = await graphQLClient.request<IQuery, IQueryFetchProductsArgs>(FETCH_PROUDUCTS, {
      search: data?.fetchProduct.files?.[0]?.name.split(".")[1],
    });
    // console.log(data, dataProducts)
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