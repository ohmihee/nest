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

    async signIn(authCredentailDto: AuthCredentailDto): Promise<string> {
        const { username, password } = authCredentailDto;
        const user = await this.UserRespository.findOne({username});
        
        if( user && (await bcrypt.compare(password, user.password))) {
            return 'login success'
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
