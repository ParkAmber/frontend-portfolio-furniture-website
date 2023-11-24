import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchLoginUserArgs,
} from "../../../commons/types/generated/types";
export const FETCH_LOGIN_USER = gql`
  query fetchLoginUser($email: String!) {
    fetchLoginUser(email: $email) {
      id
      email
      name
      point
    }
  }
`;
export const useQueryUserId = () => {
  return useLazyQuery(FETCH_LOGIN_USER);
};
