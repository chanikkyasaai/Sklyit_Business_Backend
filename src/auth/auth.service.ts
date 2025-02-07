import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BusinessClients } from '../business_clients/business_clients.entity';
import { Users } from '../sklyit_users/sklyit_users.entity';
import { SklyitUsersService } from '../sklyit_users/sklyit_users.service';
import { RefreshToken } from '../auth/refreshtoken.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: SklyitUsersService,
        @InjectRepository(BusinessClients)
        private readonly businessClientsRepository: Repository<BusinessClients>,
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,
        private readonly jwtService: JwtService
    ) { }

    async login(user: Users) {
        //console.log(user);
        const bs_id = await this.getBusinessId(user.userId);
        const payload = { mobileNumber: user.mobileno, email: user.gmail, sub: user.userId, bs_id:bs_id };
        // console.log('Payload before signing:', payload); // Debugging
        // Generate tokens
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshToken = await this.generateRefreshToken(user.userId);

        return { accessToken, refreshToken };
    }

    async validateUser(userid: string, password: string): Promise<Users> {
        const user = await this.userService.validateUser(userid, password);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getBusinessId(userId: string): Promise<string> {
        const business = await this.businessClientsRepository.findOne({
            where: { userId },
        });
        if (!business) {
            throw new NotFoundException('Business not found');
        }
        return business.BusinessId; // Ensure this property exists on the entity
    }

    // Generate Refresh Token and store it in the DB
    async generateRefreshToken(userId: string): Promise<string> {
        const refreshToken = this.jwtService.sign({ sub: userId }, { expiresIn: '30d' });

        // Hash refresh token before storing
        const hashedToken = await bcrypt.hash(refreshToken, 10);

        // Delete any existing refresh token for the user
        await this.refreshTokenRepository.delete({ userId });
        // Save token in DB
        await this.refreshTokenRepository.save({ userId, token: hashedToken });

        return refreshToken;
    }

    // Refresh Access Token
    async refreshAccessToken(refreshToken: string) {
        //console.log("Received Refresh Token:", refreshToken);
        const payload = await this.jwtService.verify(refreshToken);
        const userId = payload.sub;
        const bs_id=await this.getBusinessId(userId);
        // Fetch refresh token from DB
        const storedToken = await this.refreshTokenRepository.findOne({ where: { userId } });
        //console.log(storedToken);
        if (!storedToken || !(await bcrypt.compare(refreshToken, storedToken.token))) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // Generate new tokens
        const newAccessToken = this.jwtService.sign({ sub: userId ,bs_id:bs_id}, { expiresIn: '15m' });
        // const newRefreshToken = await this.generateRefreshToken(userId);

        return { accessToken: newAccessToken };
    }

    // Logout (Delete Refresh Token)
    async logout(userId: string) {
        await this.refreshTokenRepository.delete({ userId });
    }
}
