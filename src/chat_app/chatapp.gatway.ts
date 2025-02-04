import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from 'src/notification/notification.service';
import { ChatService } from './chat_app.service';

@WebSocketGateway(3001,{cors:{origin:'*'}})
export class ChatGateway {
    private userSocketMap: Map<string, string> = new Map();
    constructor(
        private readonly chatService: ChatService,
        private readonly notificationService:NotificationService
    ) { }

    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket, ...args: any[]): void {
        const userId = <string>client.handshake.query.userId; // Send userId in query params
        this.userSocketMap.set(userId, client.id); // Map userId to socketId
        console.log(`User ${userId} connected with socket ID ${client.id}`);
    }

    handleDisconnect(client: Socket): void {
        const userId = [...this.userSocketMap.entries()]
            .find(([_, socketId]) => socketId === client.id)?.[0];
        if (userId) {
            this.userSocketMap.delete(userId);
            console.log(`User ${userId} disconnected`);
        }
    }
    @SubscribeMessage('message')
    async handleSendMessage(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket
    ): Promise<void> {
        try {
            console.log('Client ID:', client.id);

            const { senderId, receiverId,senderName,receiverName, content } = data;
            console.log('Message Data:', senderId, receiverId, content);

            const message = await this.chatService.createMessage(senderId, receiverId,senderName,receiverName, content);
            const recieverSocketId = this.userSocketMap.get(receiverId);

            if (recieverSocketId) {
                console.log(`Sending message to receiver (${receiverId}-${receiverName}) with socket ID: ${recieverSocketId}`);
                client.to(recieverSocketId).emit('receiveMessage', message);
            } else {
                console.log(`Receiver (${receiverId}) is not connected.`);
                // If the receiver is not connected, send a push notification
                const recipientToken = await this.chatService.getUserFcmToken(receiverId); // Implement this in your service
                if (recipientToken) {
                    console.log(`Sending push notification to receiver (${receiverId})`);

                
                    const title = 'New Message';
                    const body = '${ sender } sent you a message: ${ content }';
                    const payload = { notification: { title, body }, token: recipientToken }; // { title, body, token: recipientToken };
                    await this.notificationService.sendNotification(payload);
                } else {
                    console.log(`No FCM token found for receiver (${receiverId}).`);
                }
            }
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
        }
    }
}
