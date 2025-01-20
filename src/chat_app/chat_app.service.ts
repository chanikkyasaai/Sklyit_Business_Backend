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

    async createMessage(sender: string, receiver: string, content: string): Promise<Message> {
        const newMessage = new this.messageModel({ sender, receiver, content });
        return newMessage.save();
    }

    async getUserFcmToken(userId: string): Promise<string|null> {
        // const user = await this.messageModel.findById(userId).exec(); // Adjust query based on your schema
        // return user?.fcmToken || null;
        return null;
    }
}
