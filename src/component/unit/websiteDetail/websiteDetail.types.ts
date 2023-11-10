import { IQuery } from "../../../commons/types/generated/types";

export type IDetailItemProps = {
  data?: Pick<IQuery, "fetchProduct"> | undefined;
  mainImg?: string;
  // title: string;

  mainId: string;
  dataProducts?: Pick<IQuery, "fetchProducts"> | undefined;
  isBestItems?: boolean;
  dataBest?: Pick<IQuery, "fetchBestProduct"> | undefined;
  onClickImage: (image: string) => (id: string) => void;
  dataBestProducts?: Pick<IQuery, "fetchBestProducts"> | undefined;
  // onClickMoveToDetail: (path: string) => () => void;
};
