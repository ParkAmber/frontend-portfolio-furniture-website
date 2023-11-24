import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';
export declare class BoardsService {
    findAll(): Board[];
    create({ createBoardInput }: IBoardsServiceCreate): string;
}
