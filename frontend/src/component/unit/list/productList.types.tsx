import { MouseEvent, ChangeEvent, SetStateAction, Dispatch } from "react";
export interface IProductListUIProps {
  isClicked: string;
  setIsClicked: Dispatch<SetStateAction<string>>;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickSearch: () => void;
  dataProducts: any;
  onClickMoveToDetail: (aa: string) => () => void;
  starPoint: number[];
  onClickPrevPage: () => void;
  startPage: number;
  lastPage: number;
  onClickPage: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickNextPage: () => void;
  isClickedpage: number;
  keyword: string;
}
