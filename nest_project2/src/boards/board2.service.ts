import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { BoardRepository } from "./board.repository";

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

} 