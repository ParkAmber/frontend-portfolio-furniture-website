//section06/06-08-express-with-DI-IOC/service/product.js 파일과 동일
import { Injectable, Scope } from '@nestjs/common';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

// interface IBoardsServiceCreate{
//     createBoardInput: CreateBoardInput //이렇게 class로 타입만든것을 가져다가 타입으로 지정가능!!
// }

//인젝션 스코프 ==> 1. 싱글톤(=> new 어쩌구()를 한번쓰는 것!) 으로 할지,=> 기본 설정!
//               2. request scope으로 할지(=> 요청올때마다 new 만들어 주는 것),
//               3. trsnsient scope(매 주입마다 new 만들어 주는 것)..
@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
    findAll(): Board[] {
               //1.db에 접속 후 데이터 조회 =>데이터 조회했다고 가정했음
        const result = [
            { number: 1, writer: "Amber", title: "This is title", contents: "This is contents!!" },
            { number: 2, writer: "Dss", title: "This is title", contents: "This is contents!!" },
            { number: 3, writer: "Dan", title: "This is title", contents: "This is contents!!" }
        ];
            //2. db에서 꺼내온 결과를 브라우저에 응답(response)주기
            return result
    }

    // create(writeraa: string,titleaa: string,contentsaa: string): string {
        create({createBoardInput}:IBoardsServiceCreate ): string {
            //1.브라우저에서 보내준 데이터 확인하기
            console.log(createBoardInput.writer)
            console.log(createBoardInput.title)
            console.log(createBoardInput.contents)
            console.log("==============")


            //2.db에 접속 후, 데이터 저장 =>데이터 저장했다고 가정했음

            //3. db에 저장된 결과를 브라우저에 응답(response) 주기
            return "게시물 등록 성공!!"
      
    }
}
