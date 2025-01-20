import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat_app.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: ChatService) { }

    @Get(':userId')
    async getMessages(@Param('userId') userId: string) {
        return this.messagesService.getMessagesForUser(userId);
    }
}
