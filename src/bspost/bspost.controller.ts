import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BspostService } from './bspost.service';
import { CreatePostDto } from './createpost.dto';
import { Post as PostDocument } from './bspost.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';
@Controller('bs/')
export class BspostController {
    constructor(
        private readonly postsService: BspostService,) { }

    @UseGuards(JwtAuthGuard)
    @Post('posts')
    @UseInterceptors(
        FileInterceptor('image', {
            fileFilter: (req, file, callback) => {
                const isAllowed = ['image/jpeg', 'image/png', 'image/jpg'].some(mime => mime === file.mimetype);
                callback(isAllowed ? null : new BadRequestException('Only jpeg, png, and jpg files are allowed'), isAllowed);
            },
        }),
    )
    async createPost(
        @Req() req,
        @Body() createPostDto: CreatePostDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PostDocument> {
        return this.postsService.createPost(req.user.bs_id, createPostDto, file);
    }

    @Get('posts')
    @UseGuards(JwtAuthGuard)
    async getAllPosts(
        @Req() req
    ): Promise<PostDocument[]> {
        return await this.postsService.getAllPosts(req.user.bs_id);
    }

    @UseGuards(JwtCustomerAuthGuard, JwtAuthGuard)
    @Get('post')
    async getAllPostsByFlag(
        @Req() req
    ): Promise<PostDocument[]> {
        console.log(req.user);
        return await this.postsService.getAllPostsByFlag(req.user.bs_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('posts/:id')
    async getPostById(
        @Req() req,
        @Param('id') id: string): Promise<PostDocument> {
        return this.postsService.getPostById(req.user.bs_id, id);
    }

    @UseGuards(JwtAuthGuard,JwtCustomerAuthGuard)
    @Get('post/:id')
    async getPostByFlag(
        @Req() req,
        @Param('id') id: string): Promise<PostDocument> {
        return this.postsService.getPostByFlag(req.user.bs_id, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('posts/:id')
    async updatePost(
        @Req() req,
        @Param('id') id: string,
        @Body() updatePostDto: CreatePostDto): Promise<PostDocument> {
        return this.postsService.updatePost(req.user.bs_id, id, updatePostDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('posts/:id')
    async deletePost(
        @Req() req,
        @Param('id') id: string): Promise<void> {
        return this.postsService.deletePost(req.user.bs_id, id);
    }

    @Put('posts/:id/like')
    @UseGuards(JwtCustomerAuthGuard)
    async likePost(
        @Req() req,
        @Param('id') id: string
    ): Promise<PostDocument> {
        return this.postsService.likePost(req.user.sub, id);
    }

    @Put('posts/:id/unlike')
    @UseGuards(JwtCustomerAuthGuard)
    async unlikePost(
        @Req() req,
        @Param('id') id: string
    ): Promise<PostDocument> {
        return this.postsService.unlikePost(req.user.sub, id);
    }

    @Put('posts/:id/comment')
    @UseGuards(JwtCustomerAuthGuard)
    async commentPost(
        @Req() req,
        @Param('id') id: string,
        @Body() updateComment: any
    ): Promise<PostDocument> {
        return this.postsService.commentPost(req.user.sub, id, updateComment);
    }

    @Put('posts/:id/uncomment')
    @UseGuards(JwtCustomerAuthGuard)
    async uncommentPost(
        @Req() req,
        @Param('id') id: string
    ): Promise<PostDocument> {
        return this.postsService.uncommentPost(req.user.sub, id);
    }
}
