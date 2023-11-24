import { gql } from "@apollo/client";

export const FETCH_PROUDUCT = gql`
  query fetchProduct($productId: String!) {
    fetchProduct(productId: $productId) {
      id
      name
      description
      price
      productTags {
        id
        name
      }

      productCategory {
        id
        name
      }
      files {
        id
        name
      }
    }
  }
`;
export const DELETE_PROUDUCT = gql`
  mutation deleteProduct($productId: String!) {
    deleteProduct(productId: $productId)
  }
`;
