import { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "./editProduct.queries";
import { IProductWriteUIProps } from "./editProduct.types";
import { checkValidationImage } from "../../../commons/01/Uploads01.validation";
import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
} from "../../../commons/01/Uploads01.styles";
export default function ProductEditUI(props: IProductWriteUIProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [indexSetting, setIndexSetting] = useState<number>();
  const [isUploadClicked, setIsUploadClicked] = useState(false);
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
      console.log(index);
      if (file === undefined) return;
      console.log(file);
      console.log("file 있음");
      const isValid = checkValidationImage(file);
      if (!isValid) return;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        console.log(e.target?.result); 
        if (typeof e.target?.result === "string") {
          const tempUrls = [...props.imageUrls];
          tempUrls[Number(indexSetting)] = e.target?.result;
          props.setImageUrls(tempUrls);

          const tempFiles = [...props.files];
          tempFiles[Number(indexSetting)] = file;
          props.setFiles(tempFiles);
          console.log(Number(indexSetting), tempUrls, tempFiles);
        }    
      };
    };
  return (
    <>
      <div className='page-container'>
        <section className='new'>
          <h2>Uploading my product</h2>
          <div className='mt-60'>
            <h3>Product Name</h3>
            <input           
              type='text'
              placeholder={props.isEdit ? "" : "Please write your name"}
              onChange={props.onChangeName}
              defaultValue={props.data?.fetchProduct?.name ?? ""}
              // readOnly={!!props.data?.fetchUseditem.seller?.name}
            />
          </div>
          <div className='product-name mt-60'>
            <h3>Description</h3>
            <input
              type='text'
              placeholder={props.isEdit ? "" : "Please write your product name"}
              onChange={props.onChangeDescription}
              defaultValue={props.data?.fetchProduct.description ?? ""}
              // readOnly={!!props.data?.fetchUseditem.name}
            />
          </div>

          <div className='product-summary mt-60'>
            <h3>Product Category</h3>
            <input
              type='text'
              placeholder={
                props.isEdit ? "" : "Please write your product detail"
              }
              onChange={props.onChangeProductCategoryId}
              // defaultValue={props.data?.fetchUseditem.contents ?? ""}
              // readOnly={!!props.data?.fetchUseditem.contents}
            />
          </div>
          <div className='product-price mt-60'>
            <h3>Product Price</h3>
            <input
              type='text'
              placeholder={
                props.isEdit ? "" : "Please write your product price"
              }
              onChange={props.onChangePrice}
              defaultValue={props.data?.fetchProduct.price ?? ""}
              // readOnly={!!props.data?.fetchUseditem.price}
            />
          </div>
          <div className='product-tag mt-60'>
            <h3>Tag</h3>
            <input
              type='text'
              placeholder='#Tag'
              onChange={props.onChangeTag}
            />
          </div>

          <div className='photo mt-60'>
            <h3>Photo</h3>
            <div className='photo-img'>
              {props.imageUrls.map((el: any, index: any) => (
                <div className='fetchImages'>
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
                </div>
              ))}
            </div>
          </div>
          <div className='submit-btn-con mt-120'>
            <button
              className='submit-btn'
              type='submit'
              onClick={props.onClickUpdate}>
              {props.isEdit ? "Edit" : "Submit"}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
