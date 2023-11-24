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
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myAuthorization') {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {
        super({
            //** 직접만들기
            // jwtFromRequest: (req) => {
            //     const temp = req.headers.Authorization //ex)Bearer sadasdwfq2ewd
            //     const accessToken = temp.toLowercase().replace("bearer ","") //Bearer을 소문자 bearer로 바꿔주고 그걸 빈값으로 대체시킴!
            //     return accessToken;
            //  }, //accessToken
            // ||
            // ||
            // ||
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_KEY,//mypassword,
            passReqToCallback: true
        })
    }

    //위의 코드(accessToken 인증(Authentication)) 성공하면 validate가 실행됨
    async validate(req, payload) {
        console.log("this is valodate REQ!!: ", req.headers.authorization, payload) //ex) {sub: '유저ID'}

        //1. validate 함수에서 매개변수로 req와 payload를 받습니다.
        const accessToken = req.headers.authorization.replace("Bearer ", "");
        // const refreshToken = context.req.headers.cookie; 
        
        //2. req에서 액세스 토큰을 꺼내 레디스에 해당 토큰이 저장되어있는지 확인합니다. 
        const mycache = await this.cacheManager.get(`accessToken: ${accessToken}`)
        console.log(mycache)
        
        //3. 저장되어있다면  UnauthorizedException 을 발생시킵니다. => 즉, 이미 로그아웃한 토큰을 줬기 때문에 가드에서 에러를 발생시키는 것입니다.
        if (mycache) throw new UnauthorizedException();
        
        //4. 저장되어 있지 않다면 유효한 토큰이므로, payload에서 유저 정보를 꺼내 리턴하는 기존 로직을 실행합니다. 
        return {
            id: payload.sub //req.user = { id: payload.sub }
        }
    }
}