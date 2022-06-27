import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRespository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRespository)
        private userRespository: UserRespository
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void> {
        return this.userRespository.createUser(authCredentialsDto);  
    }
}
