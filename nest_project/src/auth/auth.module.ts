import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRespository } from './user.repository';

@Module({
  imports: [
    // 유저를 인증하기 위해 사용할 기본 strategy 추가
    PassportModule.register({defaultStrategy: 'jwt'}),
    // jwt 인증 부분을 담당, 주로 sign()을 위한 부분.
    JwtModule.register({
      secret:'secretmihee',
      signOptions: {
        expiresIn: 60 * 60 // 1시간 동안 해당 토큰을 사용할 수 있음을 의미.
      }
    }),
    TypeOrmModule.forFeature([UserRespository])
  ],
  controllers: [AuthController],
  // JwtStrategy를 이 Auth 모듈에서 사용할 수 있게 등록
  providers: [AuthService, JwtStrategy],
  // JwtStrategy, PassportModule을 다른 모듈에서 사용할 수 있게 등록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
