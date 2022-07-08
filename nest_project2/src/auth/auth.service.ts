import { Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentailDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRespository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentailDto: AuthCredentailDto):Promise<void> {
        return this.UserRespository.createUser(authCredentailDto);
    }

    async signIn(authCredentailDto: AuthCredentailDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentailDto;
        const user = await this.UserRespository.findOne({username});
        
        if( user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 ( secret + payload );
            // payload에 중요 정보는 넣지 않는다.
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken}

        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
