import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { BoardController } from './board/board.controller';

@Module({ 
  imports: [BoardsModule], controllers: [BoardController],

})

export class AppModule {}

