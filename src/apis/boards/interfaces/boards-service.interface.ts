import { CreateBoardInput } from "../dto/create-board.input";

export interface IBoardsServiceCreate{
    createBoardInput: CreateBoardInput //이렇게 class로 타입만든것을 가져다가 타입으로 지정가능!!
}