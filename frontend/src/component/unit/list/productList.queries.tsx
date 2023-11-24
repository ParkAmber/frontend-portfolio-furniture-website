import { gql } from "@apollo/client";

export const FETCH_PROUDUCTS = gql`
  query fetchProducts($page: Int, $search: String) {
    fetchProducts(page: $page, search: $search) {
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
      createdAt
    }
  }
`;
// 게시물 갯수 query!!
export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export const FETCH_PROUDUCTS_COUNT = gql`
  query fetchProductsCount($search: String) {
    fetchProductsCount(search: $search)
  }
`;
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

export const FETCH_BEST_PRODUCTS = gql`
  query fetchBestProducts {
    fetchBestProducts {
      id
      name
      description
      price
      files {
        name
      }
      star
    }
  }
`;
export const FETCH_BEST_PRODUCT = gql`
  query fetchBestProduct($productId: String!) {
    fetchBestProduct(productId: $productId) {
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
      star
    }
  }
`;
