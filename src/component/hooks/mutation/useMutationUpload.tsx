import { gql, useQuery, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateProductArgs,
} from "../../../commons/types/generated/types";
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const useMutationUploadFile = () => {
  const uploadMutation = useMutation(UPLOAD_FILE);
  return uploadMutation;
};
