import { gql, useQuery, useMutation } from "@apollo/client";
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
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $updateProductInput: UpdateProductInput!
    $productId: String!
  ) {
    updateProduct(
      updateProductInput: $updateProductInput
      productId: $productId
    ) {
      id
      name
      description
      price
      productTags {
        id
        name
      }
      files {
        name
      }
    }
  }
`;
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
