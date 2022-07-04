import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardById } from './dto/get-board-by-id.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    // @Post()
    // createBoard(
    //     @Body('title') title: string,
    //     @Body('description') descrtiption: string
    // ): Board {
    //     return this.boardsService.createBoard(title,descrtiption)
    // }
    // 위의 코드를 dto를 사용하여 짜면 아래와 같다.

    @Post()
    createBoard(
        @Body() createBoardDto : CreateBoardDto
        // createBoardDto는 title과 description 인수를 담고 있다.
    ): Board{
        return this.boardsService.createBoard(createBoardDto)
    }

    @Get('/:id')
    getBoardById(@Param() getBoardById: GetBoardById) :Board {
        // 경로에서 하나의 값만 가져올 때 @Param('id') id: string
        // 경로에서 여러개의 값만 가져올 때 @Param() params: string[]
        //
        return this.boardsService.getBoardById(getBoardById)
    }

    @Delete('/:id')
    deletBoardById(@Param('id') id: string):string {
        return this.boardsService.deleteBoardById(id)
    }

    @Patch('/:id')
    updateBoardStatus(@Param('id') id: string, @Param('status') status: BoardStatus):Board{
        return this.updateBoardStatus(id, status);
    }

}
