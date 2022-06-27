import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BoardStatus } from './board-status.enum'
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
// uuid의 여러 버전 중 버전 1을 uuid이름으로 가져옴

// @Injectable() 데코레이터를 통해 다른 컴포넌트에서 이 서비스를 사용가능하게 만들어준다
@Injectable()
export class BoardsService {
    /*
    private boards: Board[] = [
        {
            id:'1',
            title:'title',
            description:'title2',
            status:BoardStatus.PRIVATE
        }
    ];
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
        const found =  this.boards.find((board)=>
            board.id === id
        )
        if(!found) {
            throw new NotFoundException(
                `Can't find Board with id ${id}`
            )
        }
        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id)
        this.boards = this.boards.filter((board)=>
        board.id !== found.id )
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
    */

    // repository 사용을 위해 종속성 주입, 컨트롤러에서 서비스를 종속성 주입할 때와는 다르게 아래와 같이 사용
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
        // @InjectRespository() 데코레이터를 통해 이 서비스에서 BoardRespository를 boardRepository 변수에 담아 사용할 것임을 알림
    ) { }
    async getBoardById (id: number) : Promise<Board> {
        const found = await this.boardRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        return found;
    }

    createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {
        
        /*
        const {title, description} = createBoardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.boardRepository.save(board);
        // .save()데이터베이스에 저장하는 것.
        // .save([board, user]) 이와 같이 여러개도 가능
        return board
        */

        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number) : Promise<void> {
        const result = await this.boardRepository.delete(id)
        console.log(result,'result');
        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }

    async deleteBoardUser(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({id, user})

        if(result.affected === 0) {
            throw new NotFoundException(`Cant find Board with id ${id}`)
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id)
        board.status = status;
        //await this.boardRepository.save(board)
        await board.save();
        return board;
    }

    async getAllBoards():Promise<Board[]> {
        //return this.boardRepository.find({title:'hello2'});
        return this.boardRepository.find();
    }

    async getOneBoardsByUser(
        user: User
    ):Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', {userId: user.id})
        const boards = await query.getMany()
        return boards
    }
}
 