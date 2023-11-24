//section06/06-08-express-with-DI-IOC/index.js 파일과 동일
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';
@Module({
    imports: [],
    // controllers: [AppController], //=> new AppController(AppService)
    providers: [
        BoardsResolver, //
        BoardsService, 
    ],
})
export class BoardsModule {}
