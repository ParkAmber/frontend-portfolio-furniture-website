import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { IContext } from "src/commons/interfaces/context";
import { AuthService } from "./auth.service";
import { GqlAuthGuard } from "./guards/gql-auth.guard";

@Resolver()
    
export class AuthResolver{

    constructor(
       private readonly  authService: AuthService
    ) {    }
    @Mutation(()=> String)
    login(
        @Args("email") email: string,
        @Args("password") password: string,
        @Context() context: IContext
    ): Promise<string> {
        console.log("Token ======> ", context.req.headers.authorization)
        console.log("RefreshToken ======> ", context.req.headers,context.req.headers.cookie)
       return this.authService.login({email, password, context})
    }
    @UseGuards(GqlAuthGuard('myAuthorization'))
    @Mutation(()=> String)
    async logout(
        // @Args("email") email: string,
        // @Args("password") password: string,
        @Context() context: IContext
    ): Promise<string> {
        // console.log("Token ======> ", context.req.headers.authorization)
        // console.log("RefreshToken ======> ", context.req.headers,context.req.headers.cookie)
        console.log(context.res.req.user["id"])

        // const accessToken = context.req.headers.authorization.replace("Bearer ", "");
        // // const refreshToken = context.req.headers.cookie; 
        // const refreshToken = context.req.headers.cookie.replace("refreshToken=", "")
        // await this.cacheManager.set("accessToken:${accessToken}", accessToken, {ttl: 50} )
        // await this.cacheManager.set("refreshToken:${refreshToken}", refreshToken, { ttl: 50 })
        
        return this.authService.logout({ context })
    //    return this.authService.login({email, password, context})
    }
    //1. refreshToken 인가 2. accessToken 재발급
    @UseGuards(GqlAuthGuard('refresh'))
    @Mutation(()=> String)
    restoreAccessToken(
        @Context() context: IContext
    ): string {
        console.log(context.req.user)
        console.log("Token222 ======> ", context.req.headers.authorization)
        console.log("RefreshToken222 ======> ", context.req.headers, context.req.headers.cookie)
        
        // 어떤 오리진을 허락할지
        // context.res.setHeader('Access-Control-Allow-Origin', 'localhost')

        // // 쿠키 상세 설정
        // context.res.setHeader('set-Cookie', `refreshToken=${context.req.headers.cookie}; path=/; domain=.amberpark.net; SameSite=None; Secure; httpOnly;`)
        // context.res.cookie("refreshtoken", context.req.headers.cookie, {
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: true,
        //     // maxAge: 24 * 60 * 60 * 1000, // 1 day
        //     // maxAge: 3 * 60 * 1000,
      
        //     // path: "/api/auth/refresh",
        //   });
        return this.authService.restoreAccessToken({user: context.req.user})
    }
}