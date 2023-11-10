import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationUpdateUserPwdArgs,
} from "../../../commons/types/generated/types";
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export const UPDATE_USER_PWD = gql`
  mutation updateUserPwd($productId: String!, $password: String!) {
    updateUserPwd(productId: $productId, password: $password) {
      email
      name
      id
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      email
      name
      point
    }
  }
`;
export const useMutationUpdatePwd = () => {
  const updateMutation = useMutation<
    Pick<IMutation, "updateUserPwd">,
    IMutationUpdateUserPwdArgs
  >(UPDATE_USER_PWD);

  return updateMutation;
};
