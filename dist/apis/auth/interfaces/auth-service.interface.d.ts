import { User } from "src/apis/users/entities/user.entity";
import { IAuthUser, IContext } from "src/commons/interfaces/context";
import { Response } from "express";
export interface IAuthServiceLogin {
    email: string;
    password: string;
    context: IContext;
}
export interface IAuthServiceGetAcessToken {
    user: User | IAuthUser["user"];
}
export interface IAuthServiceSetRefreshToken {
    user: User;
    context: IContext;
}
export interface IAuthServiceSetRefreshTokenGoogle {
    user: User;
    res: Response;
}
export interface IAuthServiceRestoreAccessToken {
    user: IAuthUser["user"];
}
