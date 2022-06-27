import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRespository } from "./user.repository";

@Injectable()
// nest.js can inject it anywhere this service is needed
// via its dependency injection system
export class JwtStrategy extends PassportStrategy(Strategy) {
    // ths class extends ths passportstrategy class defined by @nestjs/passport package
    // youre passing ths jwt strategy defined by the passport-jwt node.js package
    constructor(
        @InjectRepository(UserRespository)
        private userRespository: UserRespository
    ){
        // passes two important options
        super({
            secretOrKey: 'secretmihee',
            // this configures the secret key that jwt strategy will use
            // to decrypt the jwt token in order to validate id
            // and access its payload
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            // this configures the strategy imported from passport-jwt package
            // to look for the jwt in the authorization header of the current request
            // passed over as a bearer token
        })
    }
    // 위에서 토큰이 유효한지 확인되면 validate메소드에서 payload에 있는 유저이름이 데이터베이스에서 있는
    // 유저인지 확인 후 있다면 유저 객체를 return 값으로 던져줍니다.
    // return 값은 @UserGuards(AuthGuard())를 이용한 모든 요청이 Request object에 들어간다.
    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRespository.findOne({username})
        if(!user) {
            throw new UnauthorizedException();
        }; 
        return user
    }
}