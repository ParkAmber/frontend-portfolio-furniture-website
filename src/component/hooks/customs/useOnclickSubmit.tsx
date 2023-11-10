import { useState } from "react";
import { useMutationCreateProduct } from "../mutation/useMutationCreateProduct";
import { useMutationUploadFile } from "../mutation/useMutationUpload";
import { useOnchange } from "./useOnchange";
// import { useOnchange } from "./useOnChange";

export const useCreateProductSubmit = () => {
  const { name, description, price, productTags, productCategoryId } =
    useOnchange();

  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [imageUrls, setImageUrls] = useState(["", "", ""]); //미리보기 용
  const [files, setFiles] = useState<File[]>([]); //데이터 보내기 용
  const [nameError, setNameError] = useState("");
  const [productError, setProductError] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [productTagsError, setProductTagsError] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  //   const router = useRouter();
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
      //files.map(async (el) => await uploadFile({ variables: { file: el } })) //for문과 다르게 await해줘도 따로 서로 기다리지 않고 실행됨!!
      files.map((el) => uploadMutation({ variables: { file: el } })) //map은 베열로 리턴해주므로, Promise.all([])로 배열 넣지말고 Promise.all()로 해줘야함!!
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
              // images: [...fileUrls],
              // images: resultUrls,
              files: filteredResultUrls,
              // tags: [...tags],
            },
          },
        });
        // alert(result.data?.createUseditem.name);
        console.log(result.data);

        // void router.push(
        //   `/flea_market/products/detail/${result.data?.createUseditem._id}`
        // );
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  return { onClickSubmit };
};
