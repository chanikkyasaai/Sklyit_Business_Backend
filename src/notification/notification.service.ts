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
    async sendNotification(payload: admin.messaging.Message): Promise<void> {
        try {
            await admin.messaging().send(payload);
            console.log('Notification sent successfully');
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }
}
