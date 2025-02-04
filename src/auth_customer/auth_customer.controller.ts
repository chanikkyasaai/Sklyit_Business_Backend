import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthCustomerService } from './auth_customer.service';
import { Response } from 'express';
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
        const { access_token, refresh_token } = await this.authService.login(user);
            // console.log(access_token);
        res.cookie('accessToken', access_token, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: 'none', // Prevent CSRF
            maxAge: 3600000, // 1 hour
        });
        res.cookie(
            'refreshToken', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
        )
        return { access_token, refresh_token };
    }

    
    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) res: Response) {
        const { accessToken } = await this.authService.refreshAccessToken(refreshToken);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: 'none', // Prevent CSRF
            maxAge: 3600000, // 1 hour
        });
        
        return { accessToken };
    }
    @Get('logout')
    async logout(@Res({ passthrough: true }) res: Response,
    @Req() req) {
        await this.authService.logout(req.sub);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return { message: 'Logout successful' };
    }
}
