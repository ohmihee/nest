import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}
}

/*

@Controller('boards')
export class BoardsController {
    boardsService: BoardsService;

    constructor(boardsService: BoardService) {
        this.boardService = boardsService;
    }
}

// 본래 위의 코드 형식에서 현재에는 아래와 같이 바뀌었다.

import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}
}

 */
