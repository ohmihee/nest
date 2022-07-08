import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRespository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken
        })
    }
    async validate(payload) {
        const { username }= payload;
        const user: User = await this.userRespository.findOne({username});

        if(!user) {
            throw new UnauthorizedException()
        }

        return user;
    }

}