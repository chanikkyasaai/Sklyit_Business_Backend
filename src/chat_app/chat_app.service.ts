import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    private messages: { sender: string; message: string }[] = [];

    getMessages() {
        return this.messages;
    }

    addMessage(sender: string, message: string) {
        const newMessage = { sender, message };
        this.messages.push(newMessage);
        return newMessage;
    }
}
