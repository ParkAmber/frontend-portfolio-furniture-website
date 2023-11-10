import type { ChangeEvent, RefObject } from "react";

export interface IUploads01Props {
  index: number;
  fileUrl: string;
  defaultFileUrl?: string;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
  // data: any;
}

export interface IUploads01UIProps {
  fileRef: RefObject<HTMLInputElement>;
  fileUrl: string;
  defaultFileUrl?: string;
  onClickUpload: () => void;
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
}
// // **
// import type { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";

// export interface IUploads01Props {
//   index: number;
//   fileUrl: string;
//   defaultFileUrl?: string;
//   onChangeFileUrls: (fileUrl: string, index: number) => void;
//   setFileUrls: Dispatch<SetStateAction<string[]>>;
//   fileUrls: string[];
//   files: File[];
//   setFiles: Dispatch<SetStateAction<File[]>>;
//   filteredResult: string[];
//   data: any;
// }

// export interface IUploads01UIProps {
//   fileRef: RefObject<HTMLInputElement>;
//   fileUrl: string;
//   defaultFileUrl?: string;
//   onClickUpload: () => void;
//   onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void;
// }
