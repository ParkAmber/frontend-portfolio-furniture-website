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
  // console.log(props)
  const router = useRouter();
  // const { data: dataBest } = useQueryBestProductOne({
  //   productId: String(router.query.productId),
  // });
  // const { data: dataProducts } = useQueryFetchProduscts({
  //   search: dataBest?.fetchBestProduct.files?.[0]?.name.split(".")[1],
  // });

  const { data: dataBestProducts } = useQueryBestProducts();
  // console.log(dataBestProducts);

  const [mainImg, setMainImg] = useState("");
  const [title, setTitle] = useState("");
  const [mainId, setMainId] = useState("");

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
        isBestItems={true}
        mainImg={mainImg}
        dataBest={props.dataBest}
        dataProducts={props.dataProducts}
        onClickImage={onClickImage}
        dataBestProducts={dataBestProducts}
        // onClickMoveToDetail={onClickMoveToDetail}
        // title={title}
      />

    </>
  );
}


//만약 서버사이드 렌더링을 하는 페이지라면, yarn build:ssg해서 out 폴더 생성 불가! => next.config.js애서 exportPathMap으로 그 페이지 재외시키기!
export const getServerSideProps = async (context: any): Promise<any> => {
  const { productId } = context.params;

  try {
    const graphQLClient = new GraphQLClient('https://backend.amberpark.net/graphql');

  //   <IQuery, "fetchProducts">,
  //   IQueryFetchProductsArgs
  // >(FETCH_PROUDUCTS, {
  //   variables,
  // })


    const dataBest = await graphQLClient.request<IQuery, IQueryFetchBestProductArgs>(FETCH_BEST_PRODUCT, {
      productId: String(productId),
    });
    // console.log(dataBest)
    const dataProducts = await graphQLClient.request<IQuery, IQueryFetchProductsArgs>(FETCH_PROUDUCTS, {
      search: dataBest?.fetchBestProduct.files?.[0]?.name.split(".")[1],
    });
    // console.log(dataBest, dataProducts)
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