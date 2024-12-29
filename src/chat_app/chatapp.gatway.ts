
// // chat.gateway.ts
// import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway()
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//     private users: Set<string> = new Set();

//     @WebSocketServer()
//     server: Server;

//     @SubscribeMessage('sendMessage')
//     handleMessage(@MessageBody() message: string, @ConnectedSocket() socket: Socket): void {
//         // Emit message to all connected clients
//         socket.broadcast.emit('receiveMessage', message);
//     }

//     @SubscribeMessage('join')
//     handleJoin(@MessageBody() username: string, @ConnectedSocket() socket: Socket): void {
//         this.users.add(username);
//         socket.emit('joinSuccess', `Hello, ${username}!`);
//     }

//     handleConnection(socket: Socket): void {
//         console.log('Client connected:', socket.id);
//     }

//     handleDisconnect(socket: Socket): void {
//         console.log('Client disconnected:', socket.id);
//     }

//     @SubscribeMessage('sendPrivateMessage')
//     handlePrivateMessage(@MessageBody() data: { message: string; recipientId: string }, @ConnectedSocket() socket: Socket): void {
//         socket.to(data.recipientId).emit('receivePrivateMessage', data.message);
//     }

//     @SubscribeMessage('privatejoin')
//     handlePrivateJoin(@MessageBody() username: string, @ConnectedSocket() socket: Socket): void {
//         socket.join(username); // Join room with username
//     }
// }

import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat_app.service';

@WebSocketGateway()
export class ChatGateway {
    constructor(private readonly chatService: ChatService) { }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: { sender: string; message: string }): void {
        const message = this.chatService.addMessage(payload.sender, payload.message);
        this.server.emit('message', message); // Broadcast to all clients
    }

    @SubscribeMessage('getMessages')
    handleGetMessages(client: Socket): void {
        const messages = this.chatService.getMessages();
        client.emit('messageHistory', messages); // Send history to the requesting client
    }
}
