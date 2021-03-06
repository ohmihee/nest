import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.model";
import { BaordService2 } from "./board2.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";

@Controller()
export class BoardController2 {
    
    constructor (private boardService: BaordService2) {

    }

    @Get('/board2/:id')
    getBoardById(@Param('id') id: number) : Promise<Board> {
        return this.boardService.getBoardById(id)
    }

    @Post('/board2')
    createBoard(
        @Body('title') title: string, 
        @Body('description') description: string
    ): Promise<Board> {
        return this.createBoard(title, description)
    }

    @Post('/board3')
    @UsePipes(ValidationPipe)
    createBoard2(
        @Body() createBoardDto: CreateBoardDto
    ): Promise<Board> {
        return this.boardService.createBoard(createBoardDto)
    }
    
    @Delete('/board2')
    deleteBoard(@Param('id', ParseIntPipe) id: number) :Promise<void> {
        return this.boardService.deleteBoard(id)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ) : Promise<Board> {
        return this.boardService.updateBoardStatus(id, status)
    }

    @Get('/board2')
    getAllTask():Promise<Board[]>{
        return this.boardService.getAllBoards()
    }
} 