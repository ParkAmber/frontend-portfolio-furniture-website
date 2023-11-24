import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UpdateUserInput } from "./dto/update-user.input";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    fetchUsers(): Promise<User[]>;
    fetchUser(email: string): Promise<User>;
    createUser(email: string, password: string, name: string): Promise<User>;
    updateUser(productId: string, updateUserInput: UpdateUserInput): Promise<User>;
    deleteUser(productId: string): Promise<boolean>;
    updateUserPwd(productId: string, password: string): Promise<User>;
    fetchLoginUser(email: string): Promise<User>;
    deleteLoginUser(productId: string): Promise<boolean>;
}
