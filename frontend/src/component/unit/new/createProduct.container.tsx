import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import {
  IMutation,
  IMutationCreateProductArgs,
  IMutationUpdateProductArgs,
  IMutationUploadFileArgs,
  IUpdateProductInput,
} from "../../../commons/types/generated/types";
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  UPLOAD_FILE,
} from "./createProduct.queries";
import ProductCreateUI from "./createProduct.presenter";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any; 
}
export default function ProductWrite(props: IBoardWriteProps) {
  console.log(props.data)
  const [myFunction] = useMutation<
    Pick<IMutation, "createProduct">,
    IMutationCreateProductArgs
  >(CREATE_PRODUCT);

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
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [imageUrls, setImageUrls] = useState(["", "", ""]); //미리보기 용
  const [files, setFiles] = useState<File[]>([]); //데이터 보내기 용
  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };
 
  useEffect(() => {
    const images = props.data?.fetchProduct?.files;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.data]);

  const [nameError, setNameError] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
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

  const onClickSubmit = async () => {
    if (!name) {
      setNameError("Please type your email");
    } else {
      setNameError("");
    }
    if (!description) {
      setdescriptionError("Please type your password");
    } else {
      setdescriptionError("");
    }

    if (!price) {
      setPriceError("please fill the blank");
    } else {
      setPriceError("");
    }
    console.log(files);

    const results = await Promise.all(
      files.map((el) => uploadFile({ variables: { file: el } })) //map은 베열로 리턴해주므로, Promise.all([])로 배열 넣지말고 Promise.all()로 해줘야함!!
    );
    console.log(results); //[resultFile0,resultFile1,resultFile2]
    const resultUrls = results.map((el) => el.data?.uploadFile); //[url0, url1, url2]
    const filteredResultUrls = resultUrls.filter(
      (url) => url !== undefined
    ) as unknown as string[];
    console.log(filteredResultUrls);
    if (name && description && price) {
      try {
        const result = await myFunction({
          variables: {
            createProductInput: {
              name,
              description,
              price: price,
              productCategoryId,
              productTags: [...productTags],
              files: filteredResultUrls,
            },
          },
        });
        console.log(result.data);

        void router.push(
          `/designer/products/detail/${result.data?.createProduct.id}`
        );
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
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
    const defaultFiles = JSON.stringify(props.data?.files);
    const isChangedFiles = currentFiles2 !== defaultFiles; 
    console.log(currentFiles, isChangedFiles, resultUrls);
    if (name === "" && description === "" && !price && !isChangedFiles) {
      alert("there are no changes");
      return;
    }

    const myvariables: IUpdateProductInput = {};
    if (name) myvariables.name = name;
    if (description) myvariables.description = description;
    if (price) myvariables.price = price;
    if (productCategoryId) myvariables.productCategoryId = productCategoryId;
    if (productTags) myvariables.productTags = [...productTags];
    if (isChangedFiles) myvariables.files = filteredResultUrls;

    console.log(myvariables.price, filteredResultUrls);
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
      alert(result.data?.updateProduct.id);
      router.push(`/designer/products/detail/${result.data?.updateProduct.id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      console.log(error);
      console.log(myvariables);
      // alert(error.message);
    }
  };
  return (
    <ProductCreateUI
      isEdit={props.isEdit}
      data={props.data}
      onChangeName={onChangeName}
      onChangeDescription={onChangeDescription}
      onChangeProductCategoryId={onChangeProductCategoryId}
      onChangePrice={onChangePrice}
      onChangeTag={onChangeTag}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      setImageUrls={setImageUrls}
      setFiles={setFiles}
      imageUrls={imageUrls}
      files={files}
      setFileUrls={setFileUrls}
    />
  );
}
