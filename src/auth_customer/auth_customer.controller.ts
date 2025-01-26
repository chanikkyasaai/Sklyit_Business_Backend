import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthCustomerService } from './auth_customer.service';
import {Response} from 'express';
@Controller('bs/auth_customer')
export class AuthCustomerController {
    constructor(
        private authService: AuthCustomerService
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
        return access_token;
    }

    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('jwt');
        return { message: 'Logout successful' };
    }

}
