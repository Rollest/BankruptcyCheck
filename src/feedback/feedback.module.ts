import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { join } from 'path';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport:
          'smtps://bankruptcy_check@mail.ru:GhxnXGafBJPt5vhWVR3q@smtp.mail.ru',
        defaults: {
          from: '"БанкротствоЧек" <bankruptcy_check@mail.ru>',
        },
        template: {
          dir: 'src/feedback/feedback-templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
