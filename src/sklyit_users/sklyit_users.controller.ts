import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SklyitUsersService } from './sklyit_users.service';
import { Users } from './sklyit_users.entity';
import { CreateUserDto } from './sklyit_users.dto';

@Controller('users')
export class SklyitUsersController {
    constructor(private readonly userService: SklyitUsersService) { }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.userService.registerUser(createUserDto);
    }

    @Get()
    async getAllUsers(): Promise<Users[]> {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<Users> {
        return this.userService.getUserById(id);
    }
}