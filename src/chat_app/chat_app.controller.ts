import { Controller, Get, Param, Req } from '@nestjs/common';
import { ChatService } from './chat_app.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: ChatService) { }

    @Get(':userId')
    async getMessages(@Param('userId') userId: string) {
        console.log("fetching messages for user: ", userId);
        return this.messagesService.getMessagesForUser(userId);
    }

    @Get(':user1/:user2')
    async getMessagesBetweenUsers(@Param('user1') user1: string, @Param('user2') user2: string) {
        return this.messagesService.getMessageBetweenUsers(user1, user2);
    }
}