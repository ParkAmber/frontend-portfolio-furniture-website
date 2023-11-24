import { IContext } from "src/commons/interfaces/context";
import { AuthService } from "./auth.service";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(email: string, password: string, context: IContext): Promise<string>;
    restoreAccessToken(context: IContext): string;
}
