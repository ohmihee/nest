import { 
    Body, 
    Controller, 
    Delete, Get, Patch, Post, 
    Param,
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model'
import { CreateBoardDto } from './dto/create-board';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}
    // 접근 제한자(public, protected, private)를 생성자 (constructor) 파라미터에
    // 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다.
    // private은 프로퍼티를 클래스 내에서의 사용만 허용

    getAllTask() {
        // @Injectable를 통해 종속성 주입된 서비스는 아래와 같이 사용한다.
        this.boardService
    }

    @Get('/')
    getAllBoards(): Board[] {
        return this.boardService.getAllBoards()
    }

    @Post('/')
    //handler-level의 pipe
    @UsePipes(ValidationPipe)
    createBoard(
        // @Body('title') title: string,
        // @Body('description') description: string
        @Body() createBoardDto: CreateBoardDto
    ) {
        return this.boardService.createBoard(createBoardDto)
        
    }

    @Get('/:id')
    getBoardById(
        @Param('id') id: string
    ): Board {
        return this.boardService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id') id: string
    ): void {
        this.boardService.deleteBoard(id)
    }

    @Patch('/:id/status')
    updateBoard(
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ): Board {
        return this.boardService.updateBoardStatus(id, status)
    }

    @Post()
    @UsePipes(ValidationPipe)
    testPipe(
        @Body() createBoardDto: CreateBoardDto
    ):Board {
        return this.boardService.createBoard(createBoardDto)
    }

    @Patch('/:id/status/test')
    updateBoardStatus (
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Board {
        return this.boardService.updateBoardStatus(id, status)
    }


}

/*s

@Controller('boards')
export class BoardsController {
    boardsService: BoardsService;
    // 파라미터: [파라미터의 타입]

    constructor(boardsService: BoardService) {
        this.boardService = boardsService;
        // 프로퍼티
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
