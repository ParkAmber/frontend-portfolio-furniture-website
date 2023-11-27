import { ChangeEvent, useState } from "react";

export const useOnchange = () => {
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>();
  const [productTags, setProductTags] = useState<string[]>([]);
  const [productCategoryId, setProductCategoryId] = useState<string>("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [imageUrls, setImageUrls] = useState<string[]>(["", "", ""]); 
  const [files, setFiles] = useState<File[]>([]); 

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

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

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };
  return {
    keyword,
    name,
    description,
    price,
    productTags,
    productCategoryId,
    imageUrls,
    setImageUrls,
    files,
    setFiles,
    onChangeKeyword,
    onChangeName,
    onChangeDescription,
    onChangePrice,
    onChangeProductCategoryId,
    onChangeTag,
    onChangeFileUrls,
  };
};
