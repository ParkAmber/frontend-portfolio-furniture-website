import { Inject, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt'
import { IAuthServiceGetAcessToken, IAuthServiceLogin, IAuthServiceLogout, IAuthServiceRestoreAccessToken, IAuthServiceSetRefreshToken, IAuthServiceSetRefreshTokenGoogle } from "./interfaces/auth-service.interface";
import { JwtService } from '@nestjs/jwt'
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
//Authentication 로직!(로그인을 하는 것, 로그인을해서 토큰을 받아오는 과정)

// interface IAuthServiceLogin{
//     email: string
//     password:string
// }
// interface IAuthServiceGetAcessToken{
//     user: User
// }
@Injectable()
export class AuthService{
    constructor(
    private readonly JwtService: JwtService,  //jwt사용하기 위한 설정
    private readonly usersService: UsersService,
    
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
    ) { }
    
    async login({ email, password,context }: IAuthServiceLogin):Promise<string> {
        //1. email일치하는 유저를 db에서 찾기
        const user = await this.usersService.findOneByEmail({ email })
        
        //2. 일치하는 유저없으면 애러 주기
        if (!user) throw new UnprocessableEntityException("the email doesn't exist")
        
        //3. 일치하는 유저있지만 비번 틀리면 에러주기!
        const isAuth =  await bcrypt.compare(password, user.password) // bcrypt.compare=> user가 입력한 비번과 db에 저장되어있는 비번이 같은지 비교해 tre/false를 리턴해줌!!
        if(!isAuth) throw new UnprocessableEntityException("the password is wrong")

        //4. refresh token => refreshToken(=JWT) 만들러서 브라우저 cookie에 전달.
        // => header에 들어감(return 써줄 필요 옶음)
        this.setRefreshToken({user, context})
        // const refreshToken = this.JwtService.sign(
        //     { sub: user.id },
        //     {
        //         secret: "myRefreshpassword",
        //         expiresIn: "2w"
        //     }
        // )
        // //개발환경
        // context.res.setHeader(
        //     "set-Cookie",
        //     `refreshToken=${refreshToken}; path=/;`
        // )

        // //배포환경
        // context.res.setHeader(
        //     "set-Cookie",
        //     `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`
        // )
        // context.res.setHeader("Access-Control-Allow-Origin", "https://myfrontsite.com")



        //5. email, 비번 다 일치하면 accessToken(=JWT) 만들러서 브라우저에 전달
        // return this.JwtService.sign(
        //     { sub: user.id },
        //     {
        //         secret: "mypassword",
        //         expiresIn: "1h"
        //     }
        // );
        //=> body에 들어감
       return this.getAcessToken({user})

    }
    //logout api
    async logout({ context }: IAuthServiceLogout): Promise<string>  {

        const accessToken = context.req.headers.authorization.replace("Bearer ", "");
        // const refreshToken = context.req.headers.cookie; 
        const refreshToken = context.req.headers.cookie.replace("refreshToken=", "")
        
        if (!accessToken || !refreshToken) {
            throw new UnprocessableEntityException('Invalid tokens');
            // throw new UnauthorizedException();
        }
        // console.log("accessToken: !!!", accessToken)
        // console.log("refreshToken: !!!", refreshToken)


        try {
       
        
        //1. token created and verify
        const token = jwt.sign({ secretAccess: accessToken }, "secret_key", { expiresIn: '1h' });
        console.log("sign Token: ", token);
        jwt.verify(token, "secret_key");
        // jwt.verify(token, "secret_key");
            
        //2. refreshToken created and verify
       const refresh = jwt.sign({ secretRefresh: refreshToken }, "secret_key", { expiresIn: '1h' });
       console.log("sign Token Refresh: ", refresh);
       jwt.verify(refresh, "secret_key");
       
       //3. cacheManager를 이용해서 레디스에 두 토큰을 각각 저장
         await this.cacheManager.set(`accessToken: ${accessToken}`, accessToken, {ttl: 3600} )
         await this.cacheManager.set(`refreshToken: ${refreshToken}`, refreshToken, { ttl: 3600 })
    
        // jwt.verify(refresh, "secret_key");

    //         // console.log("aaaa===", decoded["secretAccess"] === accessToken); // bar
    //         // console.log("bbbb===", decodedRefresh["secretRefresh"] === refreshToken); // bar
   
            // If both tokens are valid, the user is logged out successfully
        return 'Logged out successfully';
            
          } catch (error) {
            console.log(error)
            throw new UnprocessableEntityException('Token verification failed');
          }
        // return "logout"
    }
    restoreAccessToken({user}: IAuthServiceRestoreAccessToken): string {
      return this.getAcessToken({user})
    }

    setRefreshToken({user, context}: IAuthServiceSetRefreshToken): void {
                //refresh token => header에 들어감(return 써줄 필요 옶음)
        const refreshToken = this.JwtService.sign(
            { sub: user.id },
            {
                secret: "myRefreshPassword",
                expiresIn: "2w"
            }
        )
        //    //개발환경
        // context.res.setHeader(
        //     'set-Cookie',
        //     `refreshToken=${refreshToken}; path=/;`,
        // )
//          // //배포환경
//         // 어떤 오리진을 허락할지
context.res.setHeader('Access-Control-Allow-Origin', 'https://amberpark.site')

// // 쿠키 상세 설정
context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.amberpark.net; SameSite=None; Secure; httpOnly;`)

    }
        setRefreshTokenGoogle({user, res}: IAuthServiceSetRefreshTokenGoogle): void {
                //refresh token => header에 들어감(return 써줄 필요 옶음)
        const refreshToken = this.JwtService.sign(
            { sub: user.id },
            {
                secret: "myRefreshPassword",
                expiresIn: "2w"
            }
        )
        //    //개발환경
        // res.setHeader(
        //     'set-Cookie',
        //     `refreshToken=${refreshToken}; path=/;`,
        // )
            //          // //배포환경
// //         // 어떤 오리진을 허락할지
res.setHeader('Access-Control-Allow-Origin', 'https://amberpark.site')

// // // 쿠키 상세 설정
res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.amberpark.net; SameSite=None; Secure; httpOnly;`)

    }
    getAcessToken({user}: IAuthServiceGetAcessToken): string {
        return this.JwtService.sign(
            { sub: user.id },
            {
                secret: "mypassword",
                expiresIn: "1h"
            }
        );
    }
}




// 실 배포시에는, 현재 localhost와 backend.amberpark.net 사이트가 다르므로 SameSite=None 옵션을 주셔야해요!
// 추가로, 여기서 SameSite=None인 경우에는 서로다른 두 사이트간의 쿠키 전송이므로 보안상 취약할 수 있어 Secure 옵션을 주셔야 된답니다!. Secure옵션상에서 작동하려면 반드시 https 여야합니다!^^

// (* 추가로, javascript로 제어를 불가능하도록 하여 httpOnly옵션도 함께 주시는게 일반적입니다!)

 

// 최종적인 결과로는 refreshtoken발급시 아래 부분을 수정해 주세요!

