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
        const payload = { mobileno: user.wtappNo, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    

    async validateUser(mobileno:string): Promise<Users> {
        const user = await this.userService.validateUser(mobileno);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

}
