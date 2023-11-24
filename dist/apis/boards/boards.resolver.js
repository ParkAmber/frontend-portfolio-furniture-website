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
exports.BoardsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const boards_service_1 = require("./boards.service");
const create_board_input_1 = require("./dto/create-board.input");
const board_entity_1 = require("./entities/board.entity");
let BoardsResolver = class BoardsResolver {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    fetchBoards() {
        return this.boardsService.findAll();
    }
    createBoard(createBoardInput) {
        return this.boardsService.create({ createBoardInput });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [board_entity_1.Board], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], BoardsResolver.prototype, "fetchBoards", null);
__decorate([
    (0, graphql_1.Mutation)((() => String)),
    __param(0, (0, graphql_1.Args)("createBoardInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_input_1.CreateBoardInput]),
    __metadata("design:returntype", String)
], BoardsResolver.prototype, "createBoard", null);
BoardsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsResolver);
exports.BoardsResolver = BoardsResolver;
//# sourceMappingURL=boards.resolver.js.map