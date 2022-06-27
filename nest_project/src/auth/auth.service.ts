import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRespository } from './user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRespository)
        private userRespository: UserRespository
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void> {
        return this.userRespository.createUser(authCredentialsDto);  
    }

    async signIn (authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRespository.findOne({username})
        if(user && (await bcrypt.compare(password, user.password))) {
            return 'logIn success'
        } else {
            throw new UnauthorizedException('login failed')
        }

    }
}
