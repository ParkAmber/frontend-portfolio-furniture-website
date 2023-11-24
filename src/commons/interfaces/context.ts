import { Request, Response } from "express";
export interface IAuthUser{
    user?: {
        id: string
    }
}

export interface IContext{
// req: Request & { user?: { id: string } } => req.user.id 이렇게 사용가능!
    // req: Request & {
    //     user?: {
    //         id: string
    //     }
    // }
    //||
    //||
    //||
    req: Request & IAuthUser
    res: Response
}