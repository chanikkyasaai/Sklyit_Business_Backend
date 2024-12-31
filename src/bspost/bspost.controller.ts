import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BspostService } from './bspost.service';
import { CreatePostDto } from './createpost.dto';
import { Post as PostDocument } from './bspost.schema';
import { AzureBlobService } from 'src/imageBlob/imageBlob.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('bs/:business_id/')
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
        @Param('business_id') bs_id: string,
        @Body() createPostDto: CreatePostDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PostDocument> {
        return this.postsService.createPost(bs_id, createPostDto, file);
    }

    @Get('posts')
    async getAllPosts(
        @Param('business_id') bs_id: string
    ): Promise<PostDocument[]> {
        return this.postsService.getAllPosts(bs_id);
    }

    @Get('post')
    async getAllPostsByFlag(
        @Param('business_id') bs_id: string
    ): Promise<PostDocument[]> {
        return this.postsService.getAllPostsByFlag(bs_id);
    }
    
    @Get('posts/:id')
    async getPostById(
        @Param('business_id') bs_id: string,
        @Param('id') id: string): Promise<PostDocument> {
        return this.postsService.getPostById(bs_id, id);
    }

    @Get('post/:id')
    async getPostByFlag(
        @Param('business_id') bs_id: string,
        @Param('id') id: string): Promise<PostDocument> {
        return this.postsService.getPostByFlag(bs_id, id);
    }

    @Put('posts/:id')
    async updatePost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string,
        @Body() updatePostDto: CreatePostDto): Promise<PostDocument> {
        return this.postsService.updatePost(bs_id, id, updatePostDto);
    }

    @Delete('posts/:id')
    async deletePost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string): Promise<void> {
        return this.postsService.deletePost(bs_id, id);
    }

    @Put('posts/:id/like')
    async likePost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string,
        @Body() likedBy: string
    ): Promise<PostDocument> {
        return this.postsService.likePost(bs_id, id, likedBy);
    }

    @Put('posts/:id/unlike')
    async unlikePost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string,
        @Body() likedBy: string
    ): Promise<PostDocument> {
        return this.postsService.unlikePost(bs_id, id, likedBy);
    }

    @Put('posts/:id/comment')
    async commentPost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string,
        @Body() updateComment: any
    ): Promise<PostDocument> {
        return this.postsService.commentPost(bs_id, id, updateComment);
    }

    @Put('posts/:id/uncomment')
    async uncommentPost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string,
        @Body() user: string
    ): Promise<PostDocument> {
        return this.postsService.uncommentPost(bs_id, id,user);
    }
}
