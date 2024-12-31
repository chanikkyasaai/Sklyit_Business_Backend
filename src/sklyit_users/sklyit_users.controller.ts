import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateUserDto } from './sklyit_users.dto';
import { Users } from './sklyit_users.entity';
import { SklyitUsersService } from './sklyit_users.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class SklyitUsersController {
  constructor(
    private readonly userService: SklyitUsersService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('myfile'))
  async registerUser(@Body() createUserDto: CreateUserDto,
  @UploadedFile() file: Express.Multer.File,): Promise<Users> {
    if(!file)throw new Error('File is required');
    return this.userService.registerUser(createUserDto);
    //return this.userService.registerUser(createUserDto, file);
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