import { Module } from "@nestjs/common";
import { ChatGateway } from "./chatapp.gatway";
import { ChatService } from './chat_app.service';
import { Message, MessageSchema } from "./message.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { MessagesController } from "./chat_app.controller";
import { NotificationModule } from "src/notification/notification.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),NotificationModule],
    controllers:[MessagesController],
    providers: [ChatGateway, ChatService],
    exports: [ChatGateway],
})

export class ChatAppModule { }