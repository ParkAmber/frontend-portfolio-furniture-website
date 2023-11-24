import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

interface OAuthUser{
    user: {
        name: string;
        email: string;
        // picture: string;
        hashedPassword: string,
        age: number

    }
}

@Controller()
export class AuthController{
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService

    ) { }
    
    @UseGuards(AuthGuard("google"))
    @Get("/login/google")
    async loginGoogle(
        @Req() req: Request & OAuthUser,
        @Res() res: Response
    ) {
        // req.user.name //'amber'
        //req.user.email

        //profile 받아온 후 로그인 처리!
        //1. 회원조회!
        let user = await this.usersService.findOneByEmail({ email: req.user.email })
       
        //2. 회원가입이 안되어있다면, 자동회원가입!
        if (!user) user = await this.usersService.create({
            ...req.user,
            // name: req.user.name,
            // email: req.user.email,
            // age: req.user.age
            password: req.user.hashedPassword
        });

       //3. 회원가입 끝나면, 로그인(refreshToken, accessToken 만들어서 브라으저에 전송)
        this.authService.setRefreshTokenGoogle({ user, res })
        res.redirect("http://localhost:5500/class/section11/frontend/social-login.html")
        // res.redirect("http://localhost:3000/website")
        
    }
}