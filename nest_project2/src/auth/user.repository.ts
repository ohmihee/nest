import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentailDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
     async createUser(authCredentailDto: AuthCredentailDto):Promise<void>{
        const { username, password } = authCredentailDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({
            username,
            password: hashedPassword
        })

        try {
            await this.save(user);
        }catch(e) {
            if(e.code === '23505') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException();
            }
            console.log('error',e)
        }
     }
}