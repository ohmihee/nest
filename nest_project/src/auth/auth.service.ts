import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRespository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRespository)
        private userRespository: UserRespository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void> {
        return this.userRespository.createUser(authCredentialsDto);  
    }

    async signIn (authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRespository.findOne({username})
        if(user && (await bcrypt.compare(password, user.password))) {
            // generate user-token (Secret+Payload)
            const payload = {username} //중요한 정보는 담지 않는다.
            const accessToken = await this.jwtService.sign(payload)
            
            return {accessToken}
        } else {
            throw new UnauthorizedException('login failed')
        }

    }
}
