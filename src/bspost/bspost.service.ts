import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './bspost.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './createpost.dto';

@Injectable()
export class BspostService {
    
    constructor(
        @InjectModel(Post.name)
        private postModel: Model<Post>) { }

    async createPost(bs_id: string, createPostDto: CreatePostDto): Promise<Post> {
        if (!bs_id) {
            throw new Error('Business ID is required'); // Throw a clear error if `bs_id` is missing
        }
        //console.log('CreatePostDto:', createPostDto);
        // Merge `business_id` into the post data
        const newPost = new this.postModel({
            ...createPostDto,
            business_id: bs_id,
        });

        // Save and return the new post
        return await newPost.save();
    }


    async getAllPosts(bs_id: string): Promise<Post[]> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        try {
            return await this.postModel.find({ business_id: bs_id }).exec();
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }

    async getPostById(bs_id: string, id: string): Promise<Post> {
        if (!bs_id || !id) {
            throw new Error('Business ID and ID are required');
        }
        try {
            const post = await this.postModel.findById({ id, business_id: bs_id }).exec();
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }

    async deletePost(bs_id: string, id: string): Promise<void> {
        if (!bs_id || !id) {
            throw new Error('Business ID and ID are required');
        }
        try {
            const post = await this.postModel.findByIdAndDelete({ id, business_id: bs_id }).exec();
            if (!post) {
                throw new Error('Post not found');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }

    async updatePost(bs_id: string, id: string, updatePostDto: CreatePostDto): Promise<Post> {
        if (!bs_id || !id) {
            throw new Error('Business ID and ID are required');
        }
        try {
            const post = await this.postModel.findOneAndUpdate({ _id:id, business_id: bs_id }, updatePostDto, { new: true }).exec();
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }

    async likePost(bs_id: string, id: string, likedBy: string): Promise<Post> {
        if (!bs_id || !id) {
            throw new Error('Business ID and ID are required');
        }
        try {
            const post = await this.postModel.findOneAndUpdate(
                { _id: id, business_id: bs_id },
                { $inc: { likes: 1 } },
            
                { new: true }).exec();
            if (!post) {
                throw new Error('Post not found');
            }
            post.likedBy.push(likedBy);
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async unlikePost(bs_id: string, id: string, likedBy: string): Promise<Post> {
        if (!bs_id || !id) {
            throw new Error('Business ID and ID are required');
        }
        try {
            const post = await this.postModel.findOneAndUpdate(
                { _id: id, business_id: bs_id },
                { $inc: { likes: -1 } },
                { new: true }).exec();
            if (!post) {
                throw new Error('Post not found');
            }
            post.likedBy = post.likedBy.filter(user => user !== likedBy);
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async commentPost(bs_id: string, id: string,updateComment:any): Promise<Post> {
        if (!bs_id || !id) {
            throw new Error('Business ID and ID are required');
        }
        try {
            const post = await this.postModel.findOneAndUpdate(
                { _id: id, business_id: bs_id },
                { $push: { comments: { user: updateComment.user, comment: updateComment.comment } } },
                { new: true }).exec();
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
