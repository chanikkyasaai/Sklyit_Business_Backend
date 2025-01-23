import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessClients } from 'src/business_clients/business_clients.entity';
import { BusinessClientsService } from 'src/business_clients/business_clients.service';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { SklyitUsersService } from 'src/sklyit_users/sklyit_users.service';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: SklyitUsersService,
        @InjectRepository(BusinessClients)
            private readonly businessClientsRepository: Repository<BusinessClients>,
        
        private readonly jwtService: JwtService
    ) { }

    async login(user: Users) {
        console.log(user);
        const bs_id=await this.getBusinessId(user.userId);
        const payload = { mobileNumber: user.mobileno, email: user.gmail, sub: user.userId,bs_id:bs_id };
        return this.jwtService.sign(payload);
    }
    

    async validateUser(userid:string, password:string): Promise<Users> {
        const user = await this.userService.validateUser(userid, password);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getBusinessId(userId: string): Promise<string> {
        const business = await this.businessClientsRepository.findOne({
            where: { userId: Equal(userId) }, 
        });
        if (!business) {
            throw new NotFoundException('Business not found');
        }
        console.log(business.BusinessId);
        return business.BusinessId; // Ensure this property exists on the entity
    }

}
