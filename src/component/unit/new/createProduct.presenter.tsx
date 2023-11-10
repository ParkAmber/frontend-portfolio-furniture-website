//===============================================================

import * as S from "../../../../styles/productCreate.styles";

import { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "./createProduct.queries";
import { checkValidationImage } from "../../../../src/commons/01/Uploads01.validation";
import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
} from "../../../../src/commons/01/Uploads01.styles";
import { IProductWriteUIProps } from "./createProduct.types";

export default function ProductCreateUI(props: IProductWriteUIProps) {
  console.log((props.data))
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  // const [imageUrls, setImageUrls] = useState(["", "", ""]); //미리보기 용
  // const [files, setFiles] = useState<File[]>([]); //데이터 보내기 용
  const [indexSetting, setIndexSetting] = useState<number>();
  const [isUploadClicked, setIsUploadClicked] = useState(false);

  // const fetchImages = props.data?.fetchUseditem?.images;
  const onClickUpload = (e: any): void => {
    fileRef.current?.click();
    console.log(e.currentTarget);
    setIndexSetting(e.target.id);
    setIsUploadClicked(true);
    console.log(isUploadClicked);
  };

  const onChangeFile =
    (index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      console.log(indexSetting, event.target);
      const file = event.target.files?.[0];
      // const index = Number(event.currentTarget.id);
      console.log(index);
      if (file === undefined) return;
      console.log(file);
      console.log("file 있음");
      const isValid = checkValidationImage(file);
      // console.log(event.target.id);
      if (!isValid) return;
      //1. 임시 URL생성 => 가짜URL (내 브라우저에서만 접근 가능함) ==> db엔 저장 x(로컬호스트 용이므로!) !

      //2. 임시 URL생성 => 진짜URL (다른 브라우저에서도 접근 가능함) ==> db엔 저장 x (용량 너무 크므로)!
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        console.log(e.target?.result); //게시판에서 e.target.id를 쓰면 eslint에 걸림==>e.target은 태그만을 의미하진 않으므로!
        if (typeof e.target?.result === "string") {
          const tempUrls = [...props.imageUrls];
          tempUrls[Number(indexSetting)] = e.target?.result;
          props.setImageUrls(tempUrls);

          const tempFiles = [...props.files];
          tempFiles[Number(indexSetting)] = file;
          props.setFiles(tempFiles);
          console.log(Number(indexSetting), tempUrls, tempFiles);
          // props.onChangeFileUrls(tempUrls[index], index);
        }
      };
    };

  // console.log(props.data, fetchImages, fetchImages[2] === undefined);
  return (
    <>
      <div className='page-container'>
        {/* <Header /> */}
        <section className='new'>
          <h2>Uploading my product</h2>
          <div className='mt-60'>
            <h3>Product Name</h3>
            <input
              // type="text"
              // placeholder="Please write your name"
              // onChange={props.onChangeSeller}
              type='text'
              placeholder={props.isEdit ? "" : "Please write product name"}
              onChange={props.onChangeName}
              defaultValue={props.data?.name ?? ""}
              // readOnly={!!props.data?.fetchUseditem.seller?.name}
            />
          </div>
          <div className='product-name mt-60'>
            <h3>Description</h3>
            <input
              type='text'
              placeholder={
                props.isEdit ? "" : "Please write product description"
              }
              onChange={props.onChangeDescription}
              defaultValue={props.data?.description ?? ""}
              // readOnly={!!props.data?.fetchUseditem.name}
            />
          </div>

          <div className='product-summary mt-60'>
            <h3>Product Category</h3>
            <input
              type='text'
              placeholder={
                props.isEdit ? "" : "Please write product category ID"
              }
              onChange={props.onChangeProductCategoryId}
              defaultValue={props.data?.productCategory.id ?? ""}
              // readOnly={!!props.data?.fetchUseditem.contents}
            />
          </div>
          <div className='product-price mt-60'>
            <h3>Product Price</h3>
            <input
              type='text'
              placeholder={props.isEdit ? "" : "Please write product price"}
              onChange={props.onChangePrice}
              defaultValue={props.data?.price ?? ""}
              // readOnly={!!props.data?.fetchUseditem.price}
            />
          </div>
          <div className='product-tag mt-60'>
            <h3>Tag</h3>
            <input
              type='text'
              placeholder='#Tag1, #Tag2, #Tag3'
              onChange={props.onChangeTag}
            />
          </div>

          <div className='photo mt-60'>
            <h3>Photo</h3>
            <div className='photo-img'>
              {/* <div></div> */}

              {props.imageUrls.map((el: any, index: any) => (
                <div className='fetchImages' key={index}>
                  {el !== "" ? (
                    <UploadImage
                      onClick={onClickUpload}
                      // src={`https://storage.googleapis.com/${el}`}
                      src={props.imageUrls[index]}
                      id={String(index)}
                    />
                  ) : (
                    <UploadButton onClick={onClickUpload} id={String(index)}>
                      <>+</>
                      <>Upload</>
                    </UploadButton>
                  )}
                  <UploadFileHidden
                    type='file'
                    ref={fileRef}
                    onChange={onChangeFile(0)}
                    id={String(index)}
                  />
                  {/* <img src={imageUrls[0]} /> */}
                </div>
              ))}
            </div>
          </div>
          <div className='submit-btn-con mt-120'>
            <button
              className='submit-btn'
              type='submit'
              onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
              // isActive={props.isEdit ? true : props.isActive}
              // onClick={props.onClickSubmit}
            >
              {props.isEdit ? "Edit" : "Submit"}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
