import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authcredentialsDto);

    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto ): Promise<{accessToken:string}> {
        return this.authService.signIn(AuthCredentialsDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log('req===', req)
    }

    @Post('/auth-test')
    @UseGuards(AuthGuard())
    // UseGuards안에 @nestjs/passport에서 가져온 AuthGuard()를 이용하여 요청안에 유저 정보를 넣어줄 수 있다.
    authTest(@GetUser() user: User) {
        console.log('user===',user);
    }
}
