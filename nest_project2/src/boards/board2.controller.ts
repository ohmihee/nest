import { Controller, Get, Param } from "@nestjs/common";
import { Board } from "./board.entity";
import { BaordService2 } from "./board2.service";

@Controller()
export class BoardController2 {
    
    constructor (private boardService: BaordService2) {

    }

    @Get('/board2/:id')
    getBoardById(@Param('id') id: number) : Promise<Board> {
        return this.boardService.getBoardById(id)
    }
    
} 