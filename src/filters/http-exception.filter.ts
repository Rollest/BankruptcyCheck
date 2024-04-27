import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Render,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.render('404/404');
  }
}
