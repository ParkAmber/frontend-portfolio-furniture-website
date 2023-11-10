// =================================================================

import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { ChangeEvent } from "react";
// import {
//   IMutation,
//   IMutationCreateProductArgs,
//   IMutationUpdateProductArgs,
//   IMutationUploadFileArgs,
// } from "../../../../src/commons/types/generated/types";
import {
  CREATE_PRODUCT,
  // UPDATE_PRODUCT,
  UPLOAD_FILE,
} from "./editProduct.queries";
import ProductCreateUI from "./editProduct.presenter";
import {
  IMutation,
  IMutationUpdateProductArgs,
  IUpdateProductInput,
} from "../../../commons/types/generated/types";
import ProductEditUI from "./editProduct.presenter";
import { UPDATE_PRODUCT } from "../new/createProduct.queries";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any; //data?는 있어도 되고 없어도 됨!!=>new page에는 data없고 edit page에는 data있으므로!!
}

//이 페이지에는 자바스크립트로 카카오 맵 라이브러리 다운받아줬으므로 카카오 들어있다고(즉, window.kakao 가능하다고)선언해줌!!
// declare const window: typeof globalThis & {
//   google: any;
// };
export default function ProductEdit(props: IBoardWriteProps) {
  const [myFunctionEdit] = useMutation<
    Pick<IMutation, "updateProduct">,
    IMutationUpdateProductArgs
  >(UPDATE_PRODUCT);

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [productTags, setProductTags] = useState<string[]>([]);
  const [productCategoryId, setProductCategoryId] = useState<string>("");

  // const [imageUrl, setImageUrl] = useState("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [imageUrls, setImageUrls] = useState(["", "", ""]); //미리보기 용
  const [files, setFiles] = useState<File[]>([]); //데이터 보내기 용
  // image

  //미리보기 용
  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
    // const newFileUrls = [...imageUrls];
    // newFileUrls[index] = fileUrl;
    // setImageUrls(newFileUrls);
  };
  //미리보기 용
  //edit페이지에서 default value로 이미지 있으면? 그 이미지를 보여줘라!!
  useEffect(() => {
    // props.data?.fetchUseditem.images
    const images = props.data?.fetchProduct.files;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.data]);

  //image

  const [nameError, setNameError] = useState("");
  const [productError, setProductError] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [productTagsError, setProductTagsError] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const onChangeProductCategoryId = (e: ChangeEvent<HTMLInputElement>) => {
    setProductCategoryId(e.target.value);
  };
  const onChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const newTags = [e.target.value];
    // newTags[i] =
    setProductTags(newTags);
  };

  //

  // const onClickUpload = (): void => {
  //   fileRef.current?.click();
  // };

  // const [index, setIndex] = useState<number>();
  // const onChangeFile = async (
  //   event: ChangeEvent<HTMLInputElement>
  // ): Promise<void> => {
  //   const file = event.target.files?.[0];
  //   const isValid = checkValidationImage(file);
  //   if (!isValid) return;

  //   try {
  //     const result = await uploadFile({ variables: { file } });
  //     fileUrls.map((el, index: number) =>
  //       onChangeFileUrls(result.data?.uploadFile.url, index)
  //     );

  //     console.log(index);
  //   } catch (error) {
  //     if (error instanceof Error) Modal.error({ content: error.message });
  //   }
  // };

  //edit click
  const onClickUpdate = async (): Promise<void> => {
    console.log("hihi", files);
    if (!files) {
      console.log("No files to upload.");
      return;
    }
    const results = await Promise.all(
      //files.map(async (el) => await uploadFile({ variables: { file: el } })) //for문과 다르게 await해줘도 따로 서로 기다리지 않고 실행됨!!
      files.map((el) => uploadFile({ variables: { file: el } })) //map은 베열로 리턴해주므로, Promise.all([])로 배열 넣지말고 Promise.all()로 해줘야함!!
    );
    console.log(results); //[resultFile0,resultFile1,resultFile2]
    const resultUrls = results.map((el) => el.data?.uploadFile); //[url0, url1, url2]
    const filteredResultUrls = resultUrls.filter(
      (url) => url !== undefined
    ) as unknown as string[];
    console.log(resultUrls, filteredResultUrls);
    const currentFiles = JSON.stringify(fileUrls);
    const currentFiles2 = JSON.stringify(filteredResultUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchProduct.files);

    //객채 두개가 완전히 똑같다 하더라도, 서로 저장되있는 주소가 다르므로 false가 나옴!!=> JSON.stringify로 문자화해서 비교해야함!!! **
    const isChangedFiles = currentFiles2 !== defaultFiles; //객체의 값을 비교해야할때는 JSON.stringify로 문자화해서 비교해야함!!! **
    // const results = await Promise.all(
    //   //files.map(async (el) => await uploadFile({ variables: { file: el } })) //for문과 다르게 await해줘도 따로 서로 기다리지 않고 실행됨!!
    //   files.map((el) => uploadFile({ variables: { file: el } })) //map은 베열로 리턴해주므로, Promise.all([])로 배열 넣지말고 Promise.all()로 해줘야함!!
    // );
    // console.log(results);
    // const resultUrls = results.map((el) => el.data?.uploadFile.url); //[url0, url1, url2]
    // const filteredResultUrls = resultUrls.filter(
    //   (url) => url !== undefined
    // ) as string[];
    // console.log(filteredResultUrls);
    console.log(currentFiles, isChangedFiles, resultUrls);
    if (name === "" && description === "" && !price && !isChangedFiles) {
      alert("there are no changes");
      return;
    }

    const myvariables: IUpdateProductInput = {};
    if (name) myvariables.name = name;
    if (description) myvariables.description = description;
    if (price) myvariables.price = price;

    // if (isChangedFiles) myvariables.images = fileUrls;
    if (isChangedFiles) myvariables.files = ["image1.png", "img2.png"];
    console.log(myvariables.price);
    try {
      if (typeof router.query.productId !== "string") {
        alert("there is something wrong");
        return;
      }
      const result = await myFunctionEdit({
        variables: {
          // updateBoardInput: myvariables,
          productId: router.query.productId,
          // updateProductInput: {
          //   name,
          //   description,
          //   price: price,
          //   productCategoryId,
          //   productTags: [...productTags],
          //   // images: [...fileUrls],
          //   // images: resultUrls,
          //   files: filteredResultUrls,
          // },
          updateProductInput: myvariables,
        },
      });
      console.log(result);
      alert(result.data);
      // alert(result.data?.updateBoard.youtubeUrl);
      // router.push(`/boards/detail/${result.data?.updateUseditem._id}`);
      // router.push(
      //   `/flea_market/products/detail/${result.data?.updateUseditem._id}`
      // );
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      console.log(error);
      console.log(myvariables);
      // alert(error.message);
    }
  };

  return (
    <ProductEditUI
      // isOpen={isOpen}
      // handleOk={handleOk}
      // handleCancel={handleCancel}
      isEdit={true}
      data={props.data}
      onChangeName={onChangeName}
      onChangeDescription={onChangeDescription}
      onChangeProductCategoryId={onChangeProductCategoryId}
      onChangePrice={onChangePrice}
      onChangeTag={onChangeTag}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
      // onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      setImageUrls={setImageUrls}
      setFiles={setFiles}
      imageUrls={imageUrls}
      files={files}
      setFileUrls={setFileUrls}
      // filteredResult={filteredResult}
    />
  );
}
