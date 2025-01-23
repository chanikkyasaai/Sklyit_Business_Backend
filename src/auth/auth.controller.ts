import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Response} from 'express';
@Controller('bs/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    async login(
        @Body() body: { userid: string, password: string },
        @Res({ passthrough: true }) res: Response) {
        const user = await this.authService.validateUser(body.userid, body.password);
        const access_token =await this.authService.login(user);
        console.log(access_token);
        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: 'none', // Prevent CSRF
            maxAge: 3600000, // 1 hour
        });
    }

}
