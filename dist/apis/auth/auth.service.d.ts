import { UsersService } from "../users/users.service";
import { IAuthServiceGetAcessToken, IAuthServiceLogin, IAuthServiceRestoreAccessToken, IAuthServiceSetRefreshToken, IAuthServiceSetRefreshTokenGoogle } from "./interfaces/auth-service.interface";
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly JwtService;
    private readonly usersService;
    constructor(JwtService: JwtService, usersService: UsersService);
    login({ email, password, context }: IAuthServiceLogin): Promise<string>;
    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string;
    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void;
    setRefreshTokenGoogle({ user, res }: IAuthServiceSetRefreshTokenGoogle): void;
    getAcessToken({ user }: IAuthServiceGetAcessToken): string;
}
