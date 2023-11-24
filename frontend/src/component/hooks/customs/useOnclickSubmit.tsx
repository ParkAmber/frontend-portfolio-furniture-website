import { useState } from "react";
import { useMutationCreateProduct } from "../mutation/useMutationCreateProduct";
import { useMutationUploadFile } from "../mutation/useMutationUpload";
import { useOnchange } from "./useOnchange";
export const useCreateProductSubmit = () => {
  const { name, description, price, productTags, productCategoryId } =
    useOnchange();
  const [files, setFiles] = useState<File[]>([]); 
  const [nameError, setNameError] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [uploadMutation] = useMutationUploadFile();
  const [createMutation] = useMutationCreateProduct();

  const onClickSubmit = async () => {
    console.log(name, description);
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
     
      files.map((el) => uploadMutation({ variables: { file: el } })) 
    );
    console.log(results); //[resultFile0,resultFile1,resultFile2]
    const resultUrls = results.map((el) => el.data?.uploadFile); //[url0, url1, url2]
    const filteredResultUrls = resultUrls.filter(
      (url) => url !== undefined
    ) as unknown as string[];
    console.log(filteredResultUrls);
    if (name && description && price) {
      try {
        const result = await createMutation({
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
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  return { onClickSubmit };
};
