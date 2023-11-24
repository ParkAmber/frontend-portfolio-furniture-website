import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { IPwdUpdate, IUserDelete, IUserServiceById, IUsersServiceCreate, IUsersServiceFindOneByEmail, IUserUpdate } from "./interfaces/users-service.interface";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User>;
    create({ email, password, name }: IUsersServiceCreate): Promise<User>;
    findAll(): Promise<User[]>;
    findOneById({ productId }: IUserServiceById): Promise<User>;
    update({ productId, updateUserInput }: IUserUpdate): Promise<User>;
    delete({ productId }: IUserDelete): Promise<boolean>;
    updatePwd({ productId, password }: IPwdUpdate): Promise<User>;
}
