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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findOneByEmail({ email }) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async create({ email, password, name }) {
        const user = await this.findOneByEmail({ email });
        if (user)
            throw new common_1.ConflictException("The email already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersRepository.save({
            email,
            password: hashedPassword,
            name,
        });
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOneById({ productId }) {
        return this.usersRepository.findOne({
            where: { id: productId },
        });
    }
    async update({ productId, updateUserInput }) {
        const product = await this.findOneById({ productId });
        const hashedPassword = await bcrypt.hash(updateUserInput.password, 10);
        console.log(updateUserInput);
        return this.usersRepository.save(Object.assign(Object.assign(Object.assign({}, product), updateUserInput), { password: hashedPassword }));
    }
    async delete({ productId }) {
        const result = await this.usersRepository.softDelete({ id: productId });
        return result.affected ? true : false;
    }
    async updatePwd({ productId, password }) {
        const product = await this.findOneById({ productId });
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(password);
        return this.usersRepository.save(Object.assign(Object.assign({}, product), { password: hashedPassword }));
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map