import Link from "next/link";
import * as S from "../../../../styles/ProductMain.styles";

import { IProductListUIProps } from "./productList.types";
import { v4 as uuidv4 } from "uuid";
import { getDate } from "../../../commons/utils";
import { useMoveToPage } from "../../hooks/customs/useMoveToPage";

export default function ProductListUI(props: IProductListUIProps) {
  const { onClickMoveToPage } = useMoveToPage();
  return (
    <div>
      <section className='nav' style={{ marginTop: "20px" }}>
        <ul className='nav-container'>
          <Link href='/designer/products/new'>
            <li onClick={onClickMoveToPage("/designer/products/new")}>
              Upload products
            </li>
          </Link>
          <Link href='/designer/products'>
            <li onClick={onClickMoveToPage("/designer/products")}>
              Products list
            </li>
          </Link>
        </ul>
      </section>
      <div className='page-container'>
        <section className='list'>
          <div className='category'>
            <div>
              <input
                type='text'
                placeholder='Search products'
                onChange={props.onChangeSearch}
                className='search-input'
              />

              <button
                style={{ background: "#000", color: "#fff" }}
                onClick={props.onClickSearch}>
                Search
              </button>
            </div>
          </div>

          {props.dataProducts?.fetchProducts.map((a: any, i: any) => (
            <div
              key={a.id}
              onClick={props.onClickMoveToDetail(String(a.id))}
              style={{ cursor: "pointer" }}>
              <div className='category-item'>
                <div>
                  {a.files[0] === undefined || null ? (
                    <img src='/banner.jpg' className='category-item-img' />
                  ) : (
                    <img
                      src={`https://storage.googleapis.com/webportfolio-backend-storage/${a.files[0]?.name}`}
                      className='category-item-img'
                    />
                  )}
                </div>
                <div>
                  <h3>
                    {/* @#$$==>벡틱${keyword}앞에 똑같은 문자($)연달아 쓰면 작동안됨!!==> 인식을 잘 못하는듯.. */}
                    {a.name
                      .replaceAll(props.keyword, `@#$%${props.keyword}@#$%`)
                      .split("@#$%")
                      .map((a: any) => (
                        <span
                          key={uuidv4()}
                          style={{
                            color: a === props.keyword ? "red" : "black",
                          }}>
                          {a}
                        </span>
                      ))}
                  </h3>
                  <p>{a.productCategory.name}</p>
                  <p>{getDate(a.createdAt)}</p>
                  <p className='text-gray'>{a.description}</p>
                  <p className='price'>$ {a.price}</p>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </section>
        <S.ButtonCon>
          <span
            onClick={props.onClickPrevPage}
            style={{
              textAlign: "center",
              cursor: "pointer",
              fontSize: "24px",
              marginRight: "10px",
            }}>
            {"<"}
          </span>

          {new Array(10).fill(1).map((_, i) =>
            i + props.startPage <= props.lastPage ? (
              <S.Button2
                key={i + props.startPage}
                id={String(i + props.startPage)}
                onClick={props.onClickPage}
                isClickedpage={i + props.startPage === props.isClickedpage}>
                {/* {a} */}
                {i + props.startPage}
              </S.Button2>
            ) : (
              <S.Button2 key={i + props.startPage}></S.Button2>
            )
          )}
          <span
            onClick={props.onClickNextPage}
            style={{
              textAlign: "center",
              cursor: "pointer",
              fontSize: "24px",
              marginLeft: "10px",
            }}>
            {">"}
          </span>
        </S.ButtonCon>
      </div>
    </div>
  );
}
