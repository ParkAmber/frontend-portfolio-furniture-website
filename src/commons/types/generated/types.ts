export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type IBestProduct = {
  __typename?: 'BestProduct';
  description: Scalars['String']['output'];
  files: Array<IProductFile>;
  id: Scalars['String']['output'];
  isSoldout: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  productCategory: IProductCategory;
  productTags: Array<IProductTag>;
  star: Scalars['Int']['output'];
  user: IUser;
};

export type IBoard = {
  __typename?: 'Board';
  contents: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  writer: Scalars['String']['output'];
};

export type ICreateBestProductInput = {
  description: Scalars['String']['input'];
  files: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  productCategoryId: Scalars['String']['input'];
  productTags: Array<Scalars['String']['input']>;
  star: Scalars['Int']['input'];
};

export type ICreateBoardInput = {
  contents: Scalars['String']['input'];
  title: Scalars['String']['input'];
  writer: Scalars['String']['input'];
};

export type ICreateProductInput = {
  description: Scalars['String']['input'];
  files: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  productCategoryId: Scalars['String']['input'];
  productTags: Array<Scalars['String']['input']>;
};

export type IMutation = {
  __typename?: 'Mutation';
  cancelPayment: IPayment;
  cancelPointTransaction: IPointTransaction;
  createBestProduct: IBestProduct;
  createBoard: Scalars['String']['output'];
  createCart: IProductCart;
  createPayment: IPayment;
  createPointTransaction: IPointTransaction;
  createProduct: IProduct;
  createProductCategory: IProductCategory;
  createUser: IUser;
  deleteBestProduct: Scalars['Boolean']['output'];
  deleteLoginUser: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  restoreAccessToken: Scalars['String']['output'];
  restoreBestItems: Scalars['Boolean']['output'];
  restoreItems: Scalars['Boolean']['output'];
  updateBestProduct: IBestProduct;
  updateProduct: IProduct;
  updateUser?: Maybe<IUser>;
  updateUserPwd: IUser;
  uploadFile: Scalars['String']['output'];
};


export type IMutationCancelPaymentArgs = {
  amount: Scalars['Float']['input'];
  commission: Scalars['Float']['input'];
  tax: Scalars['Float']['input'];
};


export type IMutationCancelPointTransactionArgs = {
  impUid: Scalars['String']['input'];
};


export type IMutationCreateBestProductArgs = {
  createBestProductInput: ICreateBestProductInput;
};


export type IMutationCreateBoardArgs = {
  createBoardInput: ICreateBoardInput;
};


export type IMutationCreateCartArgs = {
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  user: Scalars['String']['input'];
};


export type IMutationCreatePaymentArgs = {
  amount: Scalars['Int']['input'];
  commission: Scalars['Float']['input'];
  tax: Scalars['Float']['input'];
};


export type IMutationCreatePointTransactionArgs = {
  amount: Scalars['Int']['input'];
  impUid: Scalars['String']['input'];
};


export type IMutationCreateProductArgs = {
  createProductInput: ICreateProductInput;
};


export type IMutationCreateProductCategoryArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type IMutationDeleteBestProductArgs = {
  productId: Scalars['String']['input'];
};


export type IMutationDeleteLoginUserArgs = {
  productId: Scalars['String']['input'];
};


export type IMutationDeleteProductArgs = {
  productId: Scalars['String']['input'];
};


export type IMutationDeleteUserArgs = {
  productId: Scalars['String']['input'];
};


export type IMutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type IMutationRestoreBestItemsArgs = {
  productId: Scalars['String']['input'];
};


export type IMutationRestoreItemsArgs = {
  productId: Scalars['String']['input'];
};


export type IMutationUpdateBestProductArgs = {
  productId: Scalars['String']['input'];
  updateBestProductInput: IUpdateBestProductInput;
};


export type IMutationUpdateProductArgs = {
  productId: Scalars['String']['input'];
  updateProductInput: IUpdateProductInput;
};


export type IMutationUpdateUserArgs = {
  productId: Scalars['String']['input'];
  updateUserInput: IUpdateUserInput;
};


export type IMutationUpdateUserPwdArgs = {
  password: Scalars['String']['input'];
  productId: Scalars['String']['input'];
};


export type IMutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export enum IPoint_Transaction_Status_Enum {
  Cancel = 'CANCEL',
  Payment = 'PAYMENT'
}

export type IPayment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  commission: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  tax: Scalars['Int']['output'];
};

export type IPointTransaction = {
  __typename?: 'PointTransaction';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  impUid: Scalars['String']['output'];
  status: IPoint_Transaction_Status_Enum;
  user: IUser;
};

export type IProduct = {
  __typename?: 'Product';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  files: Array<IProductFile>;
  id: Scalars['String']['output'];
  isSoldout: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  productCategory: IProductCategory;
  productTags: Array<IProductTag>;
  user: IUser;
};

export type IProductCart = {
  __typename?: 'ProductCart';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  user: Scalars['String']['output'];
};

export type IProductCategory = {
  __typename?: 'ProductCategory';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type IProductFile = {
  __typename?: 'ProductFile';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<IProduct>;
};

export type IProductTag = {
  __typename?: 'ProductTag';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<IProduct>;
};

export type IQuery = {
  __typename?: 'Query';
  fetchBestProduct: IBestProduct;
  fetchBestProducts: Array<IBestProduct>;
  fetchBestProductsWithDeleted: Array<IBestProduct>;
  fetchBoards?: Maybe<Array<IBoard>>;
  fetchCart: IProductCart;
  fetchCarts: Array<IProductCart>;
  fetchDeletedBestProducts: Array<IBestProduct>;
  fetchDeletedProducts: Array<IProduct>;
  fetchLoginUser: IUser;
  fetchPayments: Array<IPayment>;
  fetchPointTransaction: Array<IPointTransaction>;
  fetchProduct: IProduct;
  fetchProductCategory: Array<IProductCategory>;
  fetchProducts: Array<IProduct>;
  fetchProductsByCategory: Array<IProduct>;
  fetchProductsCount: Scalars['Int']['output'];
  fetchProductsWithDeleted: Array<IProduct>;
  fetchUser: IUser;
  fetchUsers: Array<IUser>;
};


export type IQueryFetchBestProductArgs = {
  productId: Scalars['String']['input'];
};


export type IQueryFetchCartArgs = {
  productId: Scalars['String']['input'];
};


export type IQueryFetchLoginUserArgs = {
  email: Scalars['String']['input'];
};


export type IQueryFetchProductArgs = {
  productId: Scalars['String']['input'];
};


export type IQueryFetchProductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryFetchProductsByCategoryArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryFetchProductsCountArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type IQueryFetchUserArgs = {
  email: Scalars['String']['input'];
};

export type IUpdateBestProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  productCategoryId?: InputMaybe<Scalars['String']['input']>;
  productTags?: InputMaybe<Array<Scalars['String']['input']>>;
  star?: InputMaybe<Scalars['Int']['input']>;
};

export type IUpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  productCategoryId?: InputMaybe<Scalars['String']['input']>;
  productTags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IUpdateUserInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type IUser = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  money: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  point: Scalars['Int']['output'];
};
