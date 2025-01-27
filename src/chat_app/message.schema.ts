import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
    @Prop({ required: true })
    senderId: string;

    @Prop({ required: true })
    receiverId: string;

    @Prop({ required: true })
    senderName: string;

    @Prop({ required: true })
    receiverName: string;
    
    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    timestamp: Date;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
