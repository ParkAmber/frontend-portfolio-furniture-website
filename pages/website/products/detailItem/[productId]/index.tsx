import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useQueryBestProducts,
  useQueryFetchProduscts,
  useQueryProductOne,
} from "../../../../../src/component/hooks/query/useMutationFetchProducts";
import WebsiteDetailItem from "../../../../../src/component/unit/websiteDetail";

export default function ProductDetailPage() {
  const router = useRouter();
  const { data } = useQueryProductOne({
    productId: String(router.query.productId),
  });
  const { data: dataProducts } = useQueryFetchProduscts({
    search: data?.fetchProduct.files?.[0]?.name.split(".")[1],
  });

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
        data={data}
        isBestItems={false}
        mainImg={mainImg}
        // mainId={mainId}
        onClickImage={onClickImage}
        // onClickMoveToDetail={onClickMoveToDetail}
        dataProducts={dataProducts}
        dataBestProducts={dataBestProducts}
      />
      {/* <section className='product-detail-section'>
        <div className='product-detail-images'>
          {!mainImg ? (
            <div>
              <img
                src={`https://storage.cloud.google.com/webportfolio-backend-storage/${data?.fetchProduct.files?.[0]?.name}`}
              />
            </div>
          ) : (
            <div>
              <img
                src={`https://storage.cloud.google.com/webportfolio-backend-storage/${mainImg}`}
              />
            </div>
          )}

          <div className='detail-items-preview'>
            {dataProducts?.fetchProducts.map((el, i) => (
              <div
                key={i}
                id={el.files?.[0]?.name}
                onClick={() => onClickImage(el.files?.[0]?.name)}>
                {" "}
                <img
                  src={`https://storage.cloud.google.com/webportfolio-backend-storage/${el.files?.[0]?.name}`}
                />
              </div>
            ))}
          </div>
          <div className='product-detail-contents'>
            <p></p>
          </div>
        </div>
      </section>
      <section className='product-best-items-section'>
        <h1>BEST ITEMS</h1>
        <div className='item'>
          {dataBestProducts?.fetchBestProducts.map((el, i) => (
            <div key={i} onClick={onClickMoveToDetail(String(el.id))}>
              <img
                // onClick={onClickMoveToDetail(String(el.id))}
                src={`https://storage.cloud.google.com/webportfolio-backend-storage/${el.files?.[0]?.name}`}
              />
              <p>{el.name}</p>
              <p>{el.description}</p>
              <p>$ {el.price}</p>
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
}
