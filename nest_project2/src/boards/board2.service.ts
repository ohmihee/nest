import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.model";
import { BoardRepository } from "./board.repository";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BaordService2 {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRespository: BoardRepository
    ) {}

    async getBoardById(id: number) : Promise <Board> {
        const found = await this.boardRespository.findOne(id);
        // findone은 typeorm에서 crud 작업을 위해 제공하는 메소드의 일종
        if(!found) {
            throw new NotFoundException('cant found')
        }
        return found;
    }

    createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
        return this.boardRespository.createBoard(createBoardDto)
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRespository.delete(id);
        
        if(result.affected === 0) {
            throw new NotFoundException('')
        }
        console.log(result)
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRespository.save(board);
        return board;
    }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRespository.find()
    }

} 