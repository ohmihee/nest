import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Board, BoardStatus } from './board.model'
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board';
// uuid의 여러 버전 중 버전 1을 uuid이름으로 가져옴

// @Injectable() 데코레이터를 통해 다른 컴포넌트에서 이 서비스를 사용가능하게 만들어준다
@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    // private을 사용한 것은 해당 클래스가 아닌 다른 컴포넌트에서는 해당 boards 배열에 접근하지 못하도록 하기 위해서

    getAllBoards(): Board[] {
        // 리턴값의 타입도 전해줌
        return this.boards;
    }

    createBoard(
        createBoardDto: CreateBoardDto
    ) {
        const { title, description } = createBoardDto
        const board: Board = {
            id: uuid(),
            title: title, // title
            description: description, // description
            status: BoardStatus.PUBLIC 
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board)=>{
            board.id === id
        })
    }
}
