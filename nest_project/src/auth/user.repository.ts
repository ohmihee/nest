import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRespository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.create({username, password});

        try {
            await this.save(user)
        }  catch(err){
            if(err.code == '23505') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException();
            }
            console.log(err)
        }

        //await this.save(user)
        //console.log(user)
    }
} 