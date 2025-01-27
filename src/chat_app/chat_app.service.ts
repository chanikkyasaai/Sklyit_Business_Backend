import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ChatService {

    constructor(
        @InjectModel(Message.name)
        private messageModel: Model<Message>,

        private readonly notificationservice: NotificationService
    ) { }

    async getMessagesForUser(userId: string): Promise<Message[]> {
        return this.messageModel.find({ $or: [{ sender: userId }, { receiver: userId }] }).exec();
    }

    async createMessage(senderId: string, receiverId: string,senderName:string,receiverName:string, content: string): Promise<Message> {
        const newMessage = new this.messageModel({ senderId, receiverId,senderName,receiverName, content });
        return newMessage.save();
    }

    async getUserFcmToken(userId: string): Promise<string|null> {
        // const user = await this.messageModel.findById(userId).exec(); // Adjust query based on your schema
        // return user?.fcmToken || null;
        return null;
    }
}
