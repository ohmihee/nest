import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from './board.entity';
import { CreateBoardDto } from "./dto/create-board";

// @EntityRepository가 deprecated로 나오는 경우 버전을 너무 최신것을 사용하여서 이전 버전에서 사용되던 것이 사라져서 그런 것이다.
// 그러므로 기존에 설치된 것을 삭제하고 이전 버전으로 새로 설치하다.
// > npm uninstall typeorm
// > npm install typeorm@0.2
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const {title, description} = createBoardDto;
        /*
        const board = new Board();
        board.title = title;
        board.description = description;
        board.status = BoardStatus.PUBLIC
        */
       const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
       })
       // BoardResponsitory 클래스 내에 존재하므로, 그냥 this만으로 사용가능.
        //await this.save(board);
        await board.save();
        return board;
    }

    /* 
    remove() vs delete()
    - remove() : 존재하지 않는 데이터를 지우려고 하면 404 에러가 발생
    - delete() : 존재하지 않는 데이터를 지우려고 해도 특별한 영항이 없다.
    // remove()는 아이템 존재 여부 확인 후 삭제 두번의 데이터 베이스 접속이 필요하므로 서비스의 성능 및 속도가 저하될 수 있다. 
    그러므로 가급적 delete()를 사용해주는 것이 좋다.

    */


}