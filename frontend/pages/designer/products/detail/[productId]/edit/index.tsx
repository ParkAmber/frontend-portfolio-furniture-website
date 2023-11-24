import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { GraphQLClient } from "graphql-request";
import {
  IQuery,
  IQueryFetchProductArgs,
} from "../../../../../../src/commons/types/generated/types";
import ProductWrite from "../../../../../../src/component/unit/new/createProduct.container";
// import ProductWrite from "../../../../../../src/component/unit/new/productWriter.container";
// import ProductEdit from "../../../../../../src/component/unit/edit/editProduct.container";
export const FETCH_PRODUCT = gql`
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
export default function ProductEditPage(props: any) {
  return (
    <>
          <ProductWrite isEdit={true} data={props.data} />  
    </>
  );
}

export const getServerSideProps = async (context: any): Promise<any> => {
  const { productId } = context.params;

  try {
    const graphQLClient = new GraphQLClient('https://backend.amberpark.net/graphql');

    const result = await graphQLClient.request<IQuery, IQueryFetchProductArgs>(FETCH_PRODUCT, {
      productId: String(productId),
    });

    return {
      props: {
        data: result.fetchProduct,
      },
    };

    
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};