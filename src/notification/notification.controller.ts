import { Body, Controller, Headers, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { title } from 'process';

@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService
    ) { }
    @Post('send')
    async sendNotification(
        @Body('title') title: string,
        @Body('body') body: string,
        @Headers('fcm') token: string
    ): Promise<void> {
        const payload={notification:{title,body},token:token};
        await this.notificationService.sendNotification(payload);
    }
}
