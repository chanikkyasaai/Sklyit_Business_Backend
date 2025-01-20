import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class NotificationService implements OnModuleInit{
    onModuleInit() {
        // Initialize Firebase Admin SDK
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(process.env.FIREBASE_ADMIN_CREDENTIALS),
            });
            console.log('Firebase Admin Initialized');
        }
    }
    async sendNotification(
        tokens: string[],
        title: string,
        body: string,
        data?: Record<string, any>,
    ): Promise<void> {
        try {
            const message = {
                notification: { title, body },
                data: data || {},
                tokens,
            };

            const response = await admin.messaging().sendEachForMulticast(message); 
            console.log('Notifications sent:', response.successCount);
        } catch (error) {
            console.error('Error sending notifications:', error);
        }
    }
}
