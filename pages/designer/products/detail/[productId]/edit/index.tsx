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
  // const router = useRouter();
  // // console.log(router.query.productId);
  // if (!router || typeof router.query.productId !== "string") return;
  // const { data } = useQuery<
  //   Pick<IQuery, "fetchProduct">,
  //   IQueryFetchProductArgs
  // >(FETCH_PROUDUCT, {
  //   // variables: { useditemId: "64fa40855d6eaa0029f7a5ca" },
  //   variables: { productId: String(router.query.productId) },
  // });
  console.log(props)
  return (
    <>
      {/* <div>hihi</div> */}
      {/* <ProductEdit isEdit={true} data={data} /> */}

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
console.log(result)
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