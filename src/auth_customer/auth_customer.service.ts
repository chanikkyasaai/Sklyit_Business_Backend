import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessClients } from 'src/business_clients/business_clients.entity';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { SklyitUsersService } from 'src/sklyit_users/sklyit_users.service';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AuthCustomerService {

    constructor(
        private readonly userService: SklyitUsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(user: Users) {
        console.log(user);
        const payload = { mobileNumber: user.mobileno, email: user.gmail, sub: user.userId};
        return this.jwtService.sign(payload);
    }
    

    async validateUser(userid:string, password:string): Promise<Users> {
        const user = await this.userService.validateUser(userid, password);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

}
