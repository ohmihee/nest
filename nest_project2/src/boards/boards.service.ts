import { Injectable } from '@nestjs/common';
// import { randomUUID } from 'crypto';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
// uuid의 버전 중 v1 버전을 가져옴

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        // : 뒤에 오는 것은 반환되는 타입을 적어준다.
        // 즉 Board[]가 반환된다.
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };
        this.boards.push(board);
        return board;
    }
}
