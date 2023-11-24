"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
let BoardsService = class BoardsService {
    findAll() {
        const result = [
            { number: 1, writer: "Amber", title: "This is title", contents: "This is contents!!" },
            { number: 2, writer: "Dss", title: "This is title", contents: "This is contents!!" },
            { number: 3, writer: "Dan", title: "This is title", contents: "This is contents!!" }
        ];
        return result;
    }
    create({ createBoardInput }) {
        console.log(createBoardInput.writer);
        console.log(createBoardInput.title);
        console.log(createBoardInput.contents);
        console.log("==============");
        return "게시물 등록 성공!!";
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map