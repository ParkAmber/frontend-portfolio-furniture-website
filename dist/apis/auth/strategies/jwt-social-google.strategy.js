"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class JwtGoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor() {
        super({
            clientID: "431398552262-43lu39m7e8snimkd29p4itiiuur5ioak.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/login/google",
            scope: ["email", "profile"]
        });
    }
    validate(accessToken, refreshToken, profile) {
        console.log(accessToken, refreshToken, profile);
        return {
            name: profile.displayName,
            email: profile.emails[0].value,
            hashedPassword: "1234",
            age: 0
        };
    }
}
exports.JwtGoogleStrategy = JwtGoogleStrategy;
//# sourceMappingURL=jwt-social-google.strategy.js.map