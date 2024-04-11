import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class FeedbackService {
  constructor(private readonly mailerService: MailerService) {}
  async sendFeedback(createFeedbackDto: CreateFeedbackDto) {
    return await this.mailerService.sendMail({
      to: 'kesumen_2000@mail.ru',
      subject: 'Заявка на обратную связь',
      template: './feedback',
      context: {
        name: createFeedbackDto.name,
        email: createFeedbackDto.email,
        phone: createFeedbackDto.phone,
        message: createFeedbackDto.message,
      },
    });
  }
}
