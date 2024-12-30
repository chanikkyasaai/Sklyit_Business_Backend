import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('bs/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    async login(@Body() body:{mobileno:string}) {
        const user = await this.authService.validateUser(body.mobileno);
        return this.authService.login(user);
    }
}
