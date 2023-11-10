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

      files {
        name
      }
    }
  }
`;
// # createProduct(createProductInput:{
//   #   name:"pretty gray table table table",
//   #   description:"desc~~",
//   #   price:2000,
//   #   productCategoryId:"0110bb45-02f0-4069-9e9f-b6a3740e3a83",
//   #   productTags:["a","b","c"],
//   #   files:["asaa.png"]
//   # }){
//   #   id
//   #   name
//   # }
// export const UPDATE_PRODUCT = gql`
//   mutation updateProduct(
//     $updateProductInput: UpdateProductInput!
//     $productId: String!
//   ) {
//     updateProduct(
//       updateProductInput: $updateProductInput
//       productId: $productId
//     ) {
//       id
//       name
//       description
//       price
//       productTags {
//         id
//         name
//       }
//       files {
//         name
//       }
//     }
//   }
// `;
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
