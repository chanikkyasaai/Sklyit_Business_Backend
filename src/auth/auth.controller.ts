import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
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
        const {accessToken,refreshToken} =await this.authService.login(user);
        console.log(accessToken);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: 'none', // Prevent CSRF
            maxAge: 3600000, // 1 hour
        });
        res.cookie(
            'refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000
            }
        )
        return {token: accessToken,rtoken : refreshToken, message: 'Login successful'};
    }
    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) res: Response) {
        const { accessToken} = await this.authService.refreshAccessToken(refreshToken);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: 'none', // Prevent CSRF
            maxAge: 3600000, // 1 hour
        });
        return { token: accessToken };
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
