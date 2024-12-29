import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BspostService } from './bspost.service';
import { CreatePostDto } from './createpost.dto';
import { Post as PostDocument } from './bspost.schema';
@Controller('bs/:business_id/')
export class BspostController {
    constructor(
        private readonly postsService: BspostService) { }

    @Post('post')
    async createPost(
        @Param('business_id') bs_id: string,
        @Body() createPostDto: CreatePostDto): Promise<PostDocument> {
        return this.postsService.createPost(bs_id,createPostDto);
    }

    @Get('post')
    async getAllPosts(
        @Param('business_id') bs_id: string
    ): Promise<PostDocument[]> {
        return this.postsService.getAllPosts(bs_id);
    }

    @Get('post/:id')
    async getPostById(
        @Param('business_id') bs_id: string,
        @Param('id') id: string): Promise<PostDocument> {
        return this.postsService.getPostById(bs_id,id);
    }

    @Put('post/:id')
    async updatePost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string,
        @Body() updatePostDto: CreatePostDto): Promise<PostDocument> {
        return this.postsService.updatePost(bs_id,id,updatePostDto);
    }

    @Delete('post/:id')
    async deletePost(
        @Param('business_id') bs_id: string,
        @Param('id') id: string): Promise<void> {
            return this.postsService.deletePost(bs_id,id);
        }
}
