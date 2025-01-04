import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/sklyit_users/sklyit_users.entity';

@Controller('bs/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    async login(@Body() body:{userid:string,password:string}) {
        const user = await this.authService.validateUser(body.userid,body.password);
        return this.authService.login(user);
    }
    
}
