import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile, BadRequestException, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './sklyit_users.dto';
import { Users } from './sklyit_users.entity';
import { SklyitUsersService } from './sklyit_users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { In } from 'typeorm';


@Controller('users')
export class SklyitUsersController {
    constructor(
        private readonly userService: SklyitUsersService,
    ) { }

    @Post('register')
    @UseInterceptors(
        FileInterceptor('image', {
            fileFilter: (req, file, callback) => {
                const isAllowed = ['image/jpeg', 'image/png', 'image/jpg'].some(mime => mime === file.mimetype);
                callback(isAllowed ? null : new BadRequestException('Only jpeg, png, and jpg files are allowed'), isAllowed);
            },
        }),
    )
    async registerUser(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Users> {
        
        return this.userService.registerUser(createUserDto, file);
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

    @Put('updatePassword')
    async updatePassword(@Body() body: { id: string, newPassword: string }): Promise<Users> {
        return this.userService.updatePassword(body.id, body.newPassword);
    }

    @Put('updateUser/:userid')
    @UseInterceptors(FileInterceptor('image'))
    async updateUser(
        @Param('userid') id: string,
        @Body() updateUserDto: UpdateUserDto ,
        @UploadedFile() file: Express.Multer.File): Promise<Users> {
        return this.userService.updateUser(id, updateUserDto, file);
    }
}