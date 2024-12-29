import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically add createdAt and updatedAt fields
export class Post extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    business_id: string;
    
    @Prop()
    image: string; // URL or path to the image

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
