import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* @Module()?
 * Nest js의 모듈, @Module는 데코레이터로 주석이 달린 클래스이다.
 * 각 응용 어플리케이션에서는 하나 이상의 모듈이 필요하다.
 * 모듈은 쉽게 설명하면 하나의 인스턴스를 생성해내는 틀이라고도 할 수 있다.
 * 루트 모듈은 Nest가 사용하는 시작점이다.
 * 모듈은 기능별로 구현한다. (ex) Users, Orders, Chats)
 * 
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
 * 
 */
