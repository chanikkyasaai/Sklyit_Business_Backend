import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../bspost/bspost.schema';
import { Model } from 'mongoose';

@Injectable()
export class SphereService {
    constructor(
            @InjectModel(Post.name)
            private postModel: Model<Post>,
        ) { }
    async getTopPostsAllTime(limit: number): Promise<Post[]> {
        return this.postModel
          .find() // Find all posts
          .sort({ likes: -1 }) // Sort by likes descending (highest first)
          .limit(limit) // Limit results to 'limit' number
          .exec(); // Execute the query
      }

      async getTopPostsNewestThenLikes(limit: number): Promise<Post[]> {
        return this.postModel
          .find() // Find all posts
          .sort({ 
            createdAt: -1, // Primary sort by newest posts first
            likes: -1      // Secondary sort by likes descending
          })
          .limit(limit) // Limit results to 'limit' number
          .exec(); // Execute the query
      }

}