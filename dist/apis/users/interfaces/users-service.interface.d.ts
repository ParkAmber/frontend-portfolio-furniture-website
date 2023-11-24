import { UpdateUserInput } from "../dto/update-user.input";
export interface IUsersServiceCreate {
    email: string;
    password: string;
    name: string;
}
export interface IUsersServiceFindOneByEmail {
    email: string;
}
export interface IUserServiceById {
    productId: string;
}
export interface IUserUpdate {
    productId: string;
    updateUserInput: UpdateUserInput;
}
export interface IUserDelete {
    productId: string;
}
export interface IPwdUpdate {
    productId: string;
    password: string;
}
