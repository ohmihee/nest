import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Get('/')과 같은 형태라 할 수 있다.
  // @Get('/user')로 하면 /user 로 들어갔을 때 값이 온다.
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/test?')
  getTest(): string {
    return this.appService.getTest();
  }
}
