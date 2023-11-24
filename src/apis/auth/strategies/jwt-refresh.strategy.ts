import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'//jwt 기반으로 인가처리!
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, UnauthorizedException } from '@nestjs/common';
//ex) import { KaKaoStrategy } from 'passport-kakao' ==> kakao 로그인사용
//ex) import { GoogleStrategy } from 'passport-google' ==> google 로그인사용

//authorization(인가) : 로그인한 후, 로그인이 필요한 서비스들을 사용할 때 해당 유저임을 확인하는 것(리소스에 접근할 수 있도록 토큰을 확인하는 과정)
//1.password 검증
//2. 만료 시간 검증
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
        super({
            //** 직접만들기
            jwtFromRequest: (req) => {
                const cookie = req.headers.cookie //ex)refreshToken=sadasdwfq2ewd
                const refreshToken = cookie.replace("refreshToken=","") //refreshToken= 을 빈값으로 대체시킴!
                return refreshToken;
             }, //refreshToken
      
            secretOrKey: process.env.JWT_REFRESH_KEY,//mypassword
            passReqToCallback: true
        })
    }

    //위의 코드 성공하면 validate가 실행됨
    async validate(req, payload) {
        // console.log(payload) //ex) {sub: '유저ID'}
        console.log("this is valodate FRESH REQ!!: ", req.headers.cookie, payload) //ex) {sub: '유저ID'}
       console.log("req.headers:[[[[[[[[[[[[[",req.headers,req.headers.cookie)
        //1. req에서 리프레시 토큰을 꺼내 
        const refreshToken = req.headers.cookie.replace("refreshToken=", "")    

        //2. 레디스에 해당 토큰이 저장되어있는지 확인합니다.
        const mycache = await this.cacheManager.get(`refreshToken: ${refreshToken}`)
        console.log(mycache)
        
         //3. 저장되어있다면  UnauthorizedException 을 발생시킵니다. => 즉, 이미 로그아웃한 토큰을 줬기 때문에 가드에서 에러를 발생시키는 것입니다.
         if (mycache) throw new UnauthorizedException();

        return {
            id: payload.sub //req.user = { id: payload.sub }
        }
    }
}