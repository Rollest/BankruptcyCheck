import { IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateFeedbackDto {
  @MinLength(1, { message: 'Name should not be empty.' })
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: number;

  @MinLength(1, { message: 'Name should not be empty.' })
  message: string;
}
