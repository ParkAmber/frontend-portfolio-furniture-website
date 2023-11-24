import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import {Strategy } from 'passport-google-oauth20'

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            // clientID: "google id~~",
            // clientSecret: "google secret~~",
            clientID: "1095099987599-1mcb4pmm02uie3tasbk3boauuuj25vuf.apps.googleusercontent.com",
            clientSecret:"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",
            // clientID: "431398552262-43lu39m7e8snimkd29p4itiiuur5ioak.apps.googleusercontent.com",
            // clientSecret: "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",
            callbackURL: "http://localhost:3000/login/google",
            // callbackURL: "https://backend.amberpark.net/login/google",
            scope: ["email","profile"]
        })
      }   
    validate(accessToken, refreshToken, profile) {
        console.log(accessToken, refreshToken, profile)
        
        return {
            name: profile.displayName,
            email: profile.emails[0].value,
            hashedPassword: "1234",
            age: 0
        }

    }

}