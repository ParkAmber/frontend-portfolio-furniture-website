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
exports.UsersResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./entities/user.entity");
const users_service_1 = require("./users.service");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const update_user_input_1 = require("./dto/update-user.input");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    fetchUsers() {
        return this.usersService.findAll();
    }
    fetchUser(email) {
        return this.usersService.findOneByEmail({ email });
    }
    createUser(email, password, name) {
        return this.usersService.create({ email, password, name });
    }
    updateUser(productId, updateUserInput) {
        return this.usersService.update({ productId, updateUserInput });
    }
    deleteUser(productId) {
        return this.usersService.delete({ productId });
    }
    updateUserPwd(productId, password) {
        return this.usersService.updatePwd({ productId, password });
    }
    fetchLoginUser(email) {
        return this.usersService.findOneByEmail({ email });
    }
    deleteLoginUser(productId) {
        return this.usersService.delete({ productId });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "fetchUsers", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "fetchUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("email")),
    __param(1, (0, graphql_1.Args)("password")),
    __param(2, (0, graphql_1.Args)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User, { nullable: true }),
    __param(0, (0, graphql_1.Args)("productId")),
    __param(1, (0, graphql_1.Args)("updateUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)((0, gql_auth_guard_1.GqlAuthGuard)('myAuthorization')),
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("productId")),
    __param(1, (0, graphql_1.Args)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUserPwd", null);
__decorate([
    (0, common_1.UseGuards)((0, gql_auth_guard_1.GqlAuthGuard)('myAuthorization')),
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "fetchLoginUser", null);
__decorate([
    (0, common_1.UseGuards)((0, gql_auth_guard_1.GqlAuthGuard)('myAuthorization')),
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteLoginUser", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map