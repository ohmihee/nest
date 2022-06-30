import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
import * as config from 'config' 

async function bootstrap() {
  const serverConfig = config.get('server')
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  console.log('port: ===',serverConfig.port)
  await app.listen(serverConfig.port);
  logger.log(`application running on port: `, serverConfig.port)
}
bootstrap();