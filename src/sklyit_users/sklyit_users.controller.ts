import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './sklyit_users.dto';
import { Users } from './sklyit_users.entity';
import { SklyitUsersService } from './sklyit_users.service';


@Controller('users')
export class SklyitUsersController {
  constructor(private readonly userService: SklyitUsersService) {}

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