import { useMutation } from "@apollo/client";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import { checkValidationImage } from "./Uploads01.validation";
import Uploads01UI from "./Uploads01.presenter";
import type { IUploads01Props } from "./Uploads01.types";
import { UPLOAD_FILE } from "./Uploads01.queries";
import { Modal } from "antd";
import {
  UploadButton,
  UploadFileHidden,
  UploadImage,
} from "./Uploads01.styles";
export default function Uploads01(props: IUploads01Props): JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = (): void => {
    fileRef.current?.click();
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    const isValid = checkValidationImage(file);
    if (!isValid) return;
    try {
      const result = await uploadFile({ variables: { file } });
      console.log(result, result.data.uploadFile);
      // props.onChangeFileUrls(result.data.uploadFile.url, props.index);
      props.onChangeFileUrls(result.data.uploadFile, props.index);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <>
      {props.fileUrl !== "" ? (
        <UploadImage
          onClick={onClickUpload} 
          src={`https://storage.googleapis.com/webportfolio-backend-storage/${props.fileUrl}`}
        />
      ) : (
        <UploadButton onClick={onClickUpload}>
          <>+</>
          <p>Upload</p>
        </UploadButton>
      )}
      <UploadFileHidden type='file' ref={fileRef} onChange={onChangeFile} />
    </>
  );
}
