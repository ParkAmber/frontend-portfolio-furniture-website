import { MouseEvent, ChangeEvent, SetStateAction, Dispatch } from "react";
// export interface IProductListUIProps {
//   isClicked: string;
//   setIsClicked: Dispatch<SetStateAction<string>>;
//   onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
//   onClickSearch: () => void;
//   dataBoards: any;
//   onClickMoveToDetail: (e: MouseEvent<HTMLDivElement>) => void;
//   starPoint: number[];
//   onClickPrevPage: () => void;
//   startPage: number;
//   lastPage: number;
//   onClickPage: (e: MouseEvent<HTMLButtonElement>) => void;
//   onClickNextPage: () => void;
//   isClickedpage: number;
//   keyword: string;
// }
export interface IProductDetailCommentFetchUIProps {
  isOpen: boolean;
  isDelete: boolean;
  onClickDelete: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdate: (e: MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
  dataFaQ: any;
  setUseditemQuestionId: Dispatch<SetStateAction<string>>;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contents: string;
  setContents: Dispatch<SetStateAction<string>>;
}

export interface IProductDetailUIProps {
  data: any;
  onClickListMove: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickEdit: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}
