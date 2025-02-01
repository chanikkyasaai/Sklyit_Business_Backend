import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
    @Prop({ required: true })
    review: string;

    @Prop({ required: true, index: true }) // Add index here
    rating: number;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    serviceId: string;

    @Prop({ required: true })
    professionId: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
