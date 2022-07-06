import { Get, Module } from '@nestjs/common';
import { BoardController2 } from './board2.controller';
import { BaordService2 } from './board2.service';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController,BoardController2],
  providers: [BoardsService, BaordService2]
})
export class BoardsModule {

}
