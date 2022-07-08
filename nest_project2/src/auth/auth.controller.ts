import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentailDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentailDto):Promise<void>{   
        return this.authService.signUp(authcredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authcredentialDto: AuthCredentailDto):Promise<{accessToken:string}> {
        return this.authService.signIn(authcredentialDto);
    }

    @Post('/test')
    test(@Req() req) {
        console.log('req', req)
    }
}
