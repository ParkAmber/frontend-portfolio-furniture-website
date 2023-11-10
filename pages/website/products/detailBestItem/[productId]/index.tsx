import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useQueryBestProductOne,
  useQueryBestProducts,
  useQueryFetchProduscts,
  useQueryProductOne,
} from "../../../../../src/component/hooks/query/useMutationFetchProducts";
import WebsiteDetailItem from "../../../../../src/component/unit/websiteDetail";

export default function ProductDetailPage() {
  const router = useRouter();
  const { data: dataBest } = useQueryBestProductOne({
    productId: String(router.query.productId),
  });
  const { data: dataProducts } = useQueryFetchProduscts({
    search: dataBest?.fetchBestProduct.files?.[0]?.name.split(".")[1],
  });

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
        dataBest={dataBest}
        dataProducts={dataProducts}
        onClickImage={onClickImage}
        dataBestProducts={dataBestProducts}
        // onClickMoveToDetail={onClickMoveToDetail}
        // title={title}
      />

    </>
  );
}
