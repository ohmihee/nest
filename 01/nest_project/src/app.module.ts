import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* @Module()?
 * Nest js의 모듈, @Module는 데코레이터로 주석이 달린 클래스이다.
 *
 * 
 */
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/**
 * 데코레이터 패턴
 * 기본적으로 객체를 생성 후 객체를 꾸며주는 역할을 한다고 보면 된다.
 */
