// import { MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
// export interface IProductCreateUIProps {
//   // isOpen: boolean;
//   // handleOk: () => void;
//   // handleCancel: () => void;

//   onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
//   onChangeDescription: (e: ChangeEvent<HTMLInputElement>) => void;
//   onChangeProductCategoryId: (e: ChangeEvent<HTMLInputElement>) => void;
//   onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
//   onChangeTag: (e: ChangeEvent<HTMLInputElement>) => void;
//   isEdit: boolean;
//   // data: any;
//   // isActive: boolean;

//   fileUrls: string[];
//   onChangeFileUrls: (fileUrls: string, index: number) => void;
//   onClickSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
//   // onClickUpdate: (e: MouseEvent<HTMLButtonElement>) => void;
//   // files: File[];
//   // setFiles: Dispatch<SetStateAction<File[]>>;
//   // setImageUrls: Dispatch<SetStateAction<string[]>>;
//   // imageUrls: string[];
//   // fileUrls: string[];
// }
// **
import { MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
export interface IProductWriteUIProps {
  // isOpen: boolean;
  // handleOk: () => void;
  // handleCancel: () => void;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeProductCategoryId: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTag: (e: ChangeEvent<HTMLInputElement>) => void;
  isEdit: boolean;
  data: any;
  // isActive: boolean;

  fileUrls: string[];
  onChangeFileUrls: (fileUrls: string, index: number) => void;
  onClickSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdate: (e: MouseEvent<HTMLButtonElement>) => void;
  // fileUrls: string[];
  setFileUrls: Dispatch<SetStateAction<string[]>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  // filteredResult: string[];
  setImageUrls: Dispatch<SetStateAction<string[]>>;
  imageUrls: string[];
}
