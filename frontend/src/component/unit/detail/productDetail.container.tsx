import ProductDetailUI from "./productDetail.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDeleteProductArgs,
  IQuery,
  IQueryFetchProductArgs,
} from "../../../commons/types/generated/types";
import { DELETE_PROUDUCT, FETCH_PROUDUCT } from "./productDetail.queries";

export default function ProductDetail() {
  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchProduct">,
    IQueryFetchProductArgs
  >(FETCH_PROUDUCT, {
    variables: { productId: String(router.query.productId) },
  });
  console.log(router.query.productId);

  const [deleteUseditem] = useMutation<
    Pick<IMutation, "deleteProduct">,
    IMutationDeleteProductArgs
  >(DELETE_PROUDUCT);

  console.log("hihi", data);
  const onClickDelete = () => {
    try {
      deleteUseditem({
        variables: {
          productId: String(router.query.productId),
        },
      });
      alert("deleted successfully!");
      router.push(`/designer/products`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  const onClickEdit = () => {
    router.push(
      `/designer/products/detail/${String(router.query.productId)}/edit`
    );
    alert(router.query.productId);
  };
  const onClickListMove = () => {
    router.push("/designer/products");
  };

  return (
    <ProductDetailUI
      data={data}
      onClickListMove={onClickListMove}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
    />
  );
}
