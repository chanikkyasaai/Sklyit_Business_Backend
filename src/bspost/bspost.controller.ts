import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BspostService } from './bspost.service';
import { CreatePostDto } from './createpost.dto';
import { Post as PostDocument } from './bspost.schema';
import { AzureBlobService } from 'src/imageBlob/imageBlob.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('bs/')
export class BspostController {
    constructor(
        private readonly postsService: BspostService,
        private readonly azureBlobService: AzureBlobService) { }

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
    async getAllPosts(
        @Req() req
    ): Promise<PostDocument[]> {
        return this.postsService.getAllPosts(req.user.bs_id);
    }

    @Get('post')
    async getAllPostsByFlag(
        @Req() req
    ): Promise<PostDocument[]> {
        return this.postsService.getAllPostsByFlag(req.user.bs_id);
    }
    
    @Get('posts/:id')
    async getPostById(
        @Req() req,
        @Param('id') id: string): Promise<PostDocument> {
        return this.postsService.getPostById(req.user.bs_id, id);
    }

    @Get('post/:id')
    async getPostByFlag(
        @Req() req,
        @Param('id') id: string): Promise<PostDocument> {
        return this.postsService.getPostByFlag(req.user.bs_id, id);
    }

    @Put('posts/:id')
    async updatePost(
        @Req() req,
        @Param('id') id: string,
        @Body() updatePostDto: CreatePostDto): Promise<PostDocument> {
        return this.postsService.updatePost(req.user.bs_id, id, updatePostDto);
    }

    @Delete('posts/:id')
    async deletePost(
        @Req() req,
        @Param('id') id: string): Promise<void> {
        return this.postsService.deletePost(req.user.bs_id, id);
    }

    @Put('posts/:id/like')
    async likePost(
        @Req() req,
        @Param('id') id: string,
        @Body() likedBy: string
    ): Promise<PostDocument> {
        return this.postsService.likePost(req.user.bs_id, id, likedBy);
    }

    @Put('posts/:id/unlike')
    async unlikePost(
        @Req() req,
        @Param('id') id: string,
        @Body() likedBy: string
    ): Promise<PostDocument> {
        return this.postsService.unlikePost(req.user.bs_id, id, likedBy);
    }

    @Put('posts/:id/comment')
    async commentPost(
        @Req() req,
        @Param('id') id: string,
        @Body() updateComment: any
    ): Promise<PostDocument> {
        return this.postsService.commentPost(req.user.bs_id, id, updateComment);
    }

    @Put('posts/:id/uncomment')
    async uncommentPost(
        @Req() req,
        @Param('id') id: string,
        @Body() user: string
    ): Promise<PostDocument> {
        return this.postsService.uncommentPost(req.user.bs_id, id,user);
    }
}
