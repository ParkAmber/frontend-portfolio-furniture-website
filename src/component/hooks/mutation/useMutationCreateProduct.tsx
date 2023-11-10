import { gql, useQuery, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateProductArgs,
} from "../../../commons/types/generated/types";
export const CREATE_PRODUCT = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      description
      price
      productCategory {
        id
      }

      files {
        name
      }
    }
  }
`;

export const useMutationCreateProduct = () => {
  const createMutation = useMutation<
    Pick<IMutation, "createProduct">,
    IMutationCreateProductArgs
  >(CREATE_PRODUCT);

  return createMutation;
};
