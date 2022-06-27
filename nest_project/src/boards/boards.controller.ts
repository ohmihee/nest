import { 
    Body, 
    Controller, 
    Delete, Get, Patch, Post, 
    Param,
    UsePipes, 
    ValidationPipe, 
    ParseIntPipe,
    UseGuards
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardService: BoardsService) {}
    /*
    // boardservice를 사용하기 위해 컨트롤러에 종속성 주입, 아래와 같이 작성
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
    */
   @Get('/:id')
   getBoardById(@Param('id') id: number) : Promise<Board> {
    return this.boardService.getBoardById(id);
   }

   @Post('/')
   @UsePipes(ValidationPipe)
   createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser()user: User
    ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user)
   } 

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        // ParseIntPipe 해당 값을 int 타입으로
        return this.boardService.deleteBoard(id)
    }

    @Delete('/user/:id')
    deleteBoardAboutUser(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void>{
        return this.boardService.deleteBoardUser(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status)
    }

    @Get()
    getAllTask(): Promise<Board[]> {
        return this.boardService.getAllBoards()
    }

    @Get('/user/one')
    getAllBoardByUser(
        @GetUser() user: User
    ): Promise<Board[]>{
        return this.boardService.getOneBoardsByUser(user)
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
