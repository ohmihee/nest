import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret:'Secret1234',
      signOptions:{
        expiresIn: 60 * 60
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // providers에 JwtStrategy를 넣어주어 해당 auth 모듈에서 사용할 수 있도록 해준다.
  exports: [JwtStrategy, PassportModule]
  // jwt 관련한 것은 다른 모듈에서도 필요하므로 export해서 사용할 수 있도록 해준다.

})
export class AuthModule {}
