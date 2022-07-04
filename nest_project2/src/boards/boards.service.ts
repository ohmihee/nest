import { Injectable } from '@nestjs/common';
// import { randomUUID } from 'crypto';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardById } from './dto/get-board-by-id.dto';
// uuid의 버전 중 v1 버전을 가져옴

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        // : 뒤에 오는 것은 반환되는 타입을 적어준다.
        // 즉 Board[]가 반환된다.
        return this.boards;
    }

    createBoard(createBoardDto:CreateBoardDto) {
        const {title, description} = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };
        this.boards.push(board);
        return board;
    }

    getBoardById(getBoardById:GetBoardById):Board {
        const {id} = getBoardById;
        return this.boards.find((board) => board.id === id);
    }

    getBoardById2(id: string) :Board {
        return this.boards.find((board)=>board.id === id);

    }

    deleteBoardById(id: string): string {
        // 아무런 리턴값을 주지 않을때의 타입은 void
        this.boards = this.boards.filter((board)=>board.id!==id);
        return 'success'
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
