"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(JwtService, usersService) {
        this.JwtService = JwtService;
        this.usersService = usersService;
    }
    async login({ email, password, context }) {
        const user = await this.usersService.findOneByEmail({ email });
        if (!user)
            throw new common_1.UnprocessableEntityException("the email doesn't exist");
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new common_1.UnprocessableEntityException("the password is wrong");
        this.setRefreshToken({ user, context });
        return this.getAcessToken({ user });
    }
    restoreAccessToken({ user }) {
        return this.getAcessToken({ user });
    }
    setRefreshToken({ user, context }) {
        const refreshToken = this.JwtService.sign({ sub: user.id }, {
            secret: "myRefreshPassword",
            expiresIn: "2w"
        });
        context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    }
    setRefreshTokenGoogle({ user, res }) {
        const refreshToken = this.JwtService.sign({ sub: user.id }, {
            secret: "myRefreshPassword",
            expiresIn: "2w"
        });
        res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    }
    getAcessToken({ user }) {
        return this.JwtService.sign({ sub: user.id }, {
            secret: "mypassword",
            expiresIn: "20s"
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map