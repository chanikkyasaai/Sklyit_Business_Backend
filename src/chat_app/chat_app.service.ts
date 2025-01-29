import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { In, Repository } from 'typeorm';
import { Message } from './message.schema';
//import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name)
        private messageModel: Model<Message>,

        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        //private readonly notificationservice: NotificationService
    ) { }

    async getMessagesForUser(
        userId: string,
    ): Promise<{ userId: string; name: string }[]> {
        const messages = await this.messageModel.find({
            $or: [
                { senderId: userId },
                { receiverId: userId },
            ]
        }).exec();
        console.log(messages);

        const otherUserIds = Array.from(
            new Set(
                messages.map((message) =>
                    message.senderId === userId ? message.receiverId : message.senderId,
                ),
            ),
        );

        const otherUsers = await this.userRepository.find({
            where: { userId: In(otherUserIds) },
            select: ['userId', 'name'],
        });

        return otherUsers;
    }

    async getMessageBetweenUsers(
        user1: string,
        user2: string,
    ): Promise<Message[]> {
        console.log(user1, user2);
        return this.messageModel
            .find({
                $or: [
                    { senderId: user1, receiverId: user2 },
                    { senderId: user2, receiverId: user1 },
                ],
            })
            .sort({ createdAt: -1 })
            .exec();
    }

    async createMessage(
        senderId: string,
        receiverId: string,
        senderName: string,
        receiverName: string,
        content: string,
    ): Promise<Message> {
        const newMessage = new this.messageModel({
            senderId,
            receiverId,
            senderName,
            receiverName,
            content,
        });
        return newMessage.save();
    }

    async getUserFcmToken(userId: string): Promise<string | null> {
        const user = await this.userRepository.findOne({ where: { userId } });
        return user.fcm_token || null;
    }
}