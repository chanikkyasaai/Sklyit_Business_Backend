import { Module } from "@nestjs/common";
import { ChatGateway } from "./chatapp.gatway";
import { ChatService } from './chat_app.service';

@Module({
    providers: [ChatGateway, ChatService],
    exports: [ChatGateway],
})

export class ChatAppModule {}