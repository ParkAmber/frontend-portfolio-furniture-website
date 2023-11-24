//section06/06-08-express-with-DI-IOC/product.controller.js 파일과 동일
// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';


@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query(() => [Board], {nullable: true}) //{nullable: true}=> 값 필수아님!(즉, !없애주는것)
    fetchBoards(): Board[] {
        return this.boardsService.findAll();
    }

    @Mutation((()=> String))
    createBoard(
        @Args("createBoardInput") createBoardInput:CreateBoardInput
        // @Args("writer") writeraa: string,
        // @Args("title") titleaa: string,
        // @Args({name: "contents" ,nullable: true}) contentsaa: string, //{nullable: true}=> 값 필수아님!(즉, !없애주는것)
    ): string {
        // return this.boardsService.create(writeraa,titleaa,contentsaa) //"게시물 등록 성공!!"
        return this.boardsService.create({ createBoardInput }); //"게시물 등록 성공!!"
    }
}
