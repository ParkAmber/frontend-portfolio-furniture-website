// import { IProductDetailUIProps } from "../comment/detailCommentFetch/producDetailCommentFetch.types";

import { IProductDetailUIProps } from "./productDetail.types";

// import { IProductDetailUIProps } from "./producDetail.types";
export default function ProductDetailUI(props: IProductDetailUIProps) {
  return (
    <>
      {/* <div>Detail page</div> */}
      <div className='page-container'>
        <section className='detail-header-section mt-60'>
          <h3>Product Name: {props.data?.fetchProduct.name ?? ""}</h3>
          <p className='price'>
            <span>$</span> {props.data?.fetchProduct.price ?? ""}
          </p>
          <hr />
        </section>
        <section className='detail-image-section mt-60'>
          <div className='detail-img'>
            <img
              src={`https://storage.cloud.google.com/webportfolio-backend-storage/${props.data?.fetchProduct.files?.[0]?.name}`}
            />
          </div>
          <div className='detail-sub-imgs'>
            <div>
              <img
                src={`https://storage.cloud.google.com/webportfolio-backend-storage/${props.data?.fetchProduct.files?.[1]?.name}`}
              />
            </div>
            <div>
              <img
                src={`https://storage.cloud.google.com/webportfolio-backend-storage/${props.data?.fetchProduct.files?.[2]?.name}`}
              />
            </div>
            <div>
              <img />
            </div>
          </div>

          <p className='mt-40 tags'>#tags</p>
          <div>{props.data?.fetchProduct.productTags?.[0]?.name}</div>
        </section>
        <section className='moving-btns mt-120 mb-120'>
          <div>
            <button className='list-btn' onClick={props.onClickListMove}>
              List
            </button>
          </div>
          <div>
            <button className='edit-btn' onClick={props.onClickEdit}>
              Edit
            </button>
          </div>
          <div>
            <button className='delete-btn' onClick={props.onClickDelete}>
              Delete
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
