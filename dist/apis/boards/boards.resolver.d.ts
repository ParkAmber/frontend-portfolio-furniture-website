import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
export declare class BoardsResolver {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    fetchBoards(): Board[];
    createBoard(createBoardInput: CreateBoardInput): string;
}
