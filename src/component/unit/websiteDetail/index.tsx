import { MouseEvent } from "react";
import { IDetailItemProps } from "./websiteDetail.types";
import * as S from "../../../../styles/WebsiteMain.styles";
import {
  useAddToCart,
  usePurchasedItem,
} from "../../hooks/customs/useAddToCart";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  objectSelector,
  objectSelectorPurchase,
  visitedPageState,
} from "../../stores";
import { useMoveToPage } from "../../hooks/customs/useMoveToPage";
import Link from "next/link";
export default function WebsiteDetailItem(props: IDetailItemProps) {
 console.log(props.dataBest)
  const onClickStopPropogation = (e: MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
  };
  const { addObject } = useAddToCart();
  const { addPurchasedItem } = usePurchasedItem();
  const starPoint = [0, 1, 2, 3, 4];
  const router = useRouter();
  console.log(router.asPath, router.query.productId);

  const objectList = useRecoilValue(objectSelector);
  const setObjectList = useSetRecoilState(objectSelector);

  const purchasedItem = useRecoilValue(objectSelectorPurchase);
  const setPurchasedItem = useSetRecoilState(objectSelectorPurchase);

  const { onClickMoveToPage } = useMoveToPage();

  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);
  console.log(objectList, purchasedItem);
  return (
    <>
      <section className='product-detail-section'>
        <div className='product-detail-images'>
          <div className='product-detail-main'>
            <div className='product-detail-main-image'>
              {!props.mainImg ? (
                <div className='product-detail-main-image-big'>
                  {props.isBestItems ? (
                    //   <div style={{ border: "2px solid blue" }}>
                    <img
                      src={`https://storage.cloud.google.com/webportfolio-backend-storage/${props.dataBest?.fetchBestProduct?.files?.[0]?.name}`}
                    />
                  ) : (
                    //   </div>
                    <img
                      src={`https://storage.cloud.google.com/webportfolio-backend-storage/${props.data?.fetchProduct.files?.[0]?.name}`}
                    />
                  )}
                </div>
              ) : (
                <div className='product-detail-main-image-big'>
                  {/* <div style={{ border: "2px solid red" }}> */}
                  <img
                    src={`https://storage.cloud.google.com/webportfolio-backend-storage/${props.mainImg}`}
                  />
                </div>
              )}
              <div className='detail-items-preview'>
                {props.dataProducts?.fetchProducts?.map((el, i) => (
                  <div
                    key={i}
                    id={el.files?.[0]?.name}
                    onClick={() =>
                      props.onClickImage(el.files?.[0]?.name)(el.id)
                    }>
                    {" "}
                    <img
                      src={`https://storage.cloud.google.com/webportfolio-backend-storage/${el.files?.[0]?.name}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='product-detail-main-contents'>
              {props.isBestItems ? (
                <>
                  <h3>
                    {props.dataBest?.fetchBestProduct?.name}
                    {/* ,{router.query.productId},{props.mainId},{props.mainImg} */}
                  </h3>
                  <p className='description'>
                    {props.dataBest?.fetchBestProduct?.description}
                  </p>
                  <p>
                    {" "}
                    ${" "}
                    <span className='product-detail-price'>
                      {props.dataBest?.fetchBestProduct?.price}
                    </span>
                  </p>
                  {/* <span>{props.dataBest?.fetchBestProduct.star}</span> */}
                  <S.StarWrapperFetch>
                    {starPoint.map((atwo, itwo) => {
                      return (
                        <div key={atwo}>
                          <S.TempStarFetch
                            active={
                              itwo + 1 <=
                              Number(props.dataBest?.fetchBestProduct?.star)
                            }
                            // onClick={props.onClickStar}
                            id={String(itwo + 1)}
                          />{" "}
                        </div>
                      );
                    })}
                    <span className='star-count'>
                      ({props.dataBest?.fetchBestProduct?.star})
                    </span>
                  </S.StarWrapperFetch>
                </>
              ) : (
                <>
                  <h3>
                    {props.data?.fetchProduct.name}
                    {/* , {router.query.productId},
                    {props.mainId},{props.mainImg} */}
                  </h3>
                  <p className='description'>
                    {props.data?.fetchProduct.description}
                  </p>
                  <p>
                    ${" "}
                    <span className='product-detail-price'>
                      {props.data?.fetchProduct.price}
                    </span>
                  </p>
                </>
              )}
              {/* <hr /> */}
              <div className='product-detail-sub-contents'>
                <div>
                  <p>delivery info</p>
                  <p>free delivery</p>
                  <p>will be delivered by 04/15</p>
                </div>
                <div>
                  <p>point benefits</p>
                  <p>earn 5,000 points when you buy</p>
                </div>
                <div>
                  <p>card benefits</p>
                  <p>interest-free installment</p>
                  <p>more details {">"}</p>
                </div>
              </div>{" "}
              {/* <hr /> */}
              <div className='product-detail-sub-contents-compensation'>
                <p>compensation info</p>
                <p>
                  Rob works with executives, business leaders, and their teams
                  with executives, business leaders, and their teams to create
                  powerful change, inspire innovation, develop powerful
                  strategy, and create effective engagement.{" "}
                </p>
              </div>
              {/* <hr /> */}
              <div className='product-detail-button'>
                <div>
                  {props.isBestItems ? (
                    <>
                      <button
                        onClick={() =>
                          addObject({
                            id:
                              String(props.mainId) ||
                              String(router.query.productId),
                            name: String(props.dataBest?.fetchBestProduct.name),
                            price: Number(
                              props.dataBest?.fetchBestProduct.price
                            ),
                            description: String(
                              props.dataBest?.fetchBestProduct.description
                            ),
                            url:
                              String(props.mainImg) ||
                              String(
                                props.dataBest?.fetchBestProduct.files[0].name
                              ),
                            quantity: 1,
                          })
                        }>
                        ADD TO CART
                      </button>

                      <button
                        onClick={() => {
                          addPurchasedItem({
                            id:
                              String(props.mainId) ||
                              String(router.query.productId),
                            name: String(props.dataBest?.fetchBestProduct.name),
                            price: Number(
                              props.dataBest?.fetchBestProduct.price
                            ),
                            description: String(
                              props.dataBest?.fetchBestProduct.description
                            ),
                            url:
                              String(props.mainImg) ||
                              String(
                                props.dataBest?.fetchBestProduct.files[0].name
                              ),
                            quantity: 1,
                          });
                          router.push("/website/products/payment");
                          setVisitedPage(router.asPath);
                        }}>
                        PURCHASE
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          addObject({
                            id:
                              String(props.mainId) ||
                              String(router.query.productId),
                            name: String(props.data?.fetchProduct.name),
                            price: Number(props.data?.fetchProduct.price),
                            description: String(
                              props.data?.fetchProduct.description
                            ),
                            url:
                              String(props.mainImg) ||
                              String(props.data?.fetchProduct.files[0].name),
                            quantity: 1,
                          })
                        }>
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => {
                          addPurchasedItem({
                            id:
                              String(props.mainId) ||
                              String(router.query.productId),
                            name: String(props.data?.fetchProduct.name),
                            price: Number(props.data?.fetchProduct.price),
                            description: String(
                              props.data?.fetchProduct.description
                            ),
                            url:
                              String(props.mainImg) ||
                              String(props.data?.fetchProduct.files[0].name),
                            quantity: 1,
                          });
                          router.push("/website/products/payment");
                          setVisitedPage(router.asPath);
                        }}>
                        PURCHASE
                      </button>
                    </>
                  )}
                  {/* <Link href='/website/products/payment'> */}

                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='product-best-items-section'>
        <h1>BEST ITEMS</h1>
        <div className='item'>
          {props.dataBestProducts?.fetchBestProducts.map((el, i) => (
            <div
              className='product-best-items-section-con'
              key={i}
              onClick={onClickMoveToPage(
                `/website/products/detailBestItem/${el.id}`
              )}>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => props.onClickImage(el.files?.[0]?.name)(el.id)}
                src={`https://storage.cloud.google.com/webportfolio-backend-storage/${el.files?.[0]?.name}`}
              />
              <p onClick={onClickStopPropogation}>{el.name}</p>
              <p onClick={onClickStopPropogation}>{el.description}</p>
              <p onClick={onClickStopPropogation}>$ {el.price}</p>
              {/* <span>{el.star}</span> */}
              <S.StarWrapperFetch>
                {starPoint.map((atwo, itwo) => {
                  return (
                    <div key={atwo}>
                      <S.TempStarFetch
                        active={itwo + 1 <= el.star}
                        // onClick={props.onClickStar}
                        id={String(i + 1)}
                      />{" "}
                    </div>
                  );
                })}
                <span className='star-count'>({el.star})</span>
              </S.StarWrapperFetch>
            </div>
          ))}
        </div>
      </section>
      <section className='banner-section'>
        <div>
          <img src='/banner.png' />
        </div>
      </section>{" "}
    </>
  );
}
