import { useAddToCart } from "../../../src/component/hooks/customs/useAddToCart";
import {
  useQueryFetchProduscts,
  useQueryProductsCounts,
} from "../../../src/component/hooks/query/useMutationFetchProducts";
import { useState, useCallback } from "react";
import { usePagination } from "../../../src/component/hooks/customs/usePagination";
import { useSearchbar } from "../../../src/component/hooks/customs/useSearchbar";
import Paginations01 from "../../../src/component/commons/paginations/01/Paginations01.index";

import _ from "lodash";
import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
// import { CategoryLiItem } from "../../../src/commons/LiTag";
export default function ProductsListPage() {


  //category chair
  const router = useRouter();
  const [category, setCategory] = useState(false);
  let [tab, setTab] = useState(0);
  const { data, refetch } = useQueryFetchProduscts();
  const { data: dataProductsCount, refetch: refetchProductsCount } =
    useQueryProductsCounts();

  const paginationArgs = usePagination({
    refetch,
    count: dataProductsCount?.fetchProductsCount,
  });

  const [keywordCategory, setKeywordCategory] = useState("");

  const getDebounce = _.debounce((aaa) => {
    void refetch({ search: aaa, page: 1 });
    void refetchProductsCount({ search: aaa });
    setKeywordCategory(aaa);
  }, 500);
  const { keyword, onChangeSearchbar } = useSearchbar({
    refetch,
    refetchProductsCount,
  });
  const onClickSearch = (cate: string) => (index: number) => {
    getDebounce(cate);
    handleLiClick(index);
    // console.log(index);
    // e.stopPropagation();
  };

  const { addObject } = useAddToCart();

  const [fadeStates, setFadeStates] = useState(["end", "", ""]);
  const onClickCategory = useCallback(() => {
    setCategory((prev) => !prev);
  }, []);

  const handleLiClick = (index: number) => {
    setTab(index);
    const newFadeStates = [...fadeStates];
    newFadeStates[index] = "end";
    setFadeStates(newFadeStates);

    fadeStates.map((a, i) =>
      i !== index ? (newFadeStates[i] = "") : (newFadeStates[i] = "end")
    );
  };
  // const onClickSearchIcon = (): void => {
  //   getDebounce(keyword);
  // };
  const onClickMoveToDetail = (path: string) => () => {
    router.push(`/website/products/detailItem/${path}`);
  };
  return (
    <>
      {" "}
      <section className='banner-section'>
        <div>
          <img src='/banner.png' />
        </div>
      </section>{" "}
      <section className='search-section'>
        <div className='search-section-container'>
          <input placeholder='SEARCH' onChange={onChangeSearchbar} />
          <SearchOutlined
            rev={undefined}
            style={{ color: "#7b7b7b", fontSize: "20px", paddingLeft: "10px" }}
            // onClick={onClickSearchIcon}
          />
        </div>
      </section>
      <section className='list-section'>
        <section className='category-nav-section'>
          {" "}
          {category ? (
            <>
              <p onClick={onClickCategory}>
                CATEGORY{" "}
                <span className='category-span'>
                  <UpOutlined rev={undefined} />
                </span>
              </p>
              <ul>
                {" "}
                <li
                  className={`start ${fadeStates[0]}`}
                  id='table'
                  onClick={() => onClickSearch("table")(0)}>
                  TABLE
                </li>
                <li
                  id='chair'
                  className={`start ${fadeStates[1]}`}
                  onClick={() => onClickSearch("chair")(1)}>
                  CHAIR
                </li>
                <li
                  id='chair'
                  className={`start ${fadeStates[2]}`}
                  onClick={() => onClickSearch("lamp")(2)}>
                  LAMP
                </li>
                {/* <CategoryLiItem setTab={setTab} onClickSearch={onClickSearch} /> */}
              </ul>{" "}
            </>
          ) : (
            <p onClick={onClickCategory}>
              CATEGORY{" "}
              <span className='category-span'>
                <DownOutlined rev={undefined} />
              </span>
            </p>
          )}
        </section>

        <section className='list-item-section'>
          {data?.fetchProducts?.map((el) => (
            <div key={el.id} className='item'>
              <div className='section-img'>
                <img
                  onClick={onClickMoveToDetail(String(el.id))}
                  src={`https://storage.googleapis.com/webportfolio-backend-storage/${el.files[0].name}`}
                />
              </div>
              <div className='section-content'>
                <h3>{el.name}</h3>
                <p>{el.description}</p>
                <div className='cart-section'>
                  <p>${el.price}</p>
                  <img
                    className='cart-img'
                    src='/cart.png'
                    onClick={() =>
                      addObject({
                        id: el.id,
                        name: el.name,
                        price: el.price,
                        description: el.description,
                        url: el.files[0].name,
                        quantity: 1,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>{" "}
      <Paginations01
        {...paginationArgs}
        // onClickPrevPage={paginationArgs.onClickPrevPage}
      />
    </>
  );
}
