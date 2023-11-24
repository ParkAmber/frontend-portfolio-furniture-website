import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import {
  UPLOAD_FILE,
} from "./editProduct.queries";
import {
  IMutation,
  IMutationUpdateProductArgs,
  IUpdateProductInput,
} from "../../../commons/types/generated/types";
import ProductEditUI from "./editProduct.presenter";
import { UPDATE_PRODUCT } from "../new/createProduct.queries";
export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any; 
}

export default function ProductEdit(props: IBoardWriteProps) {
  const [myFunctionEdit] = useMutation<
    Pick<IMutation, "updateProduct">,
    IMutationUpdateProductArgs
  >(UPDATE_PRODUCT);

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [productTags, setProductTags] = useState<string[]>([]);
  const [productCategoryId, setProductCategoryId] = useState<string>("");

  // const [imageUrl, setImageUrl] = useState("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [imageUrls, setImageUrls] = useState(["", "", ""]); 
  const [files, setFiles] = useState<File[]>([]);
  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };
  useEffect(() => {
    const images = props.data?.fetchProduct.files;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.data]);
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
    setProductTags(newTags);
  };
  //edit click
  const onClickUpdate = async (): Promise<void> => {
    console.log("hihi", files);
    if (!files) {
      console.log("No files to upload.");
      return;
    }
    const results = await Promise.all(
      files.map((el) => uploadFile({ variables: { file: el } })) 
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
    const isChangedFiles = currentFiles2 !== defaultFiles; 
    if (name === "" && description === "" && !price && !isChangedFiles) {
      alert("there are no changes");
      return;
    }
    const myvariables: IUpdateProductInput = {};
    if (name) myvariables.name = name;
    if (description) myvariables.description = description;
    if (price) myvariables.price = price;
    if (isChangedFiles) myvariables.files = ["image1.png", "img2.png"];
    console.log(myvariables.price);
    try {
      if (typeof router.query.productId !== "string") {
        alert("there is something wrong");
        return;
      }
      const result = await myFunctionEdit({
        variables: {
          productId: router.query.productId,
          updateProductInput: myvariables,
        },
      });
      console.log(result);
      alert(result.data);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      console.log(error);
      console.log(myvariables);
    }
  };

  return (
    <ProductEditUI
      isEdit={true}
      data={props.data}
      onChangeName={onChangeName}
      onChangeDescription={onChangeDescription}
      onChangeProductCategoryId={onChangeProductCategoryId}
      onChangePrice={onChangePrice}
      onChangeTag={onChangeTag}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
      onClickUpdate={onClickUpdate}
      setImageUrls={setImageUrls}
      setFiles={setFiles}
      imageUrls={imageUrls}
      files={files}
      setFileUrls={setFileUrls}
    />
  );
}
