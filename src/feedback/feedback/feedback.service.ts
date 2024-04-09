import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  postFeedback(createFeedbackDto: CreateFeedbackDto) {
    return createFeedbackDto;
  }
}
