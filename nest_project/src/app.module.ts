import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';


@Module({ 
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    // 데이터베이스 typeorm 설정
    BoardsModule
  ]

})

export class AppModule {}

