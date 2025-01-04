import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { SklyitUsersService } from 'src/sklyit_users/sklyit_users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: SklyitUsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(user:Users) {
        const payload = { mobileNumber: user.mobileno, email: user.gmail, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    

    async validateUser(userid:string, password:string): Promise<Users> {
        const user = await this.userService.validateUser(userid, password);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

}
