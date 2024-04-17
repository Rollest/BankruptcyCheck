import {
  Controller,
  Get,
  Param,
  Render,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { IUser } from './auth/types/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('')
  @Render('index')
  async getMain(@Request() req) {
    return await this.appService.validateJWT(req);
  }

  @Get('about')
  @Render('about/about')
  async getAbout(@Request() req) {
    return await this.appService.validateJWT(req);
  }

  @Get('faq')
  @Render('faq/faq')
  async getFAQ(@Request() req) {
    return await this.appService.validateJWT(req);
  }

  @Get('constructor')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Render('constructor/constructor')
  async getConstructor(@Request() req) {
    return await this.appService.validateJWT(req);
  }

  @Get('policy/:name')
  @Render('policy')
  async getPolicy(@Param('name') name: string) {
    return { policy: name };
  }
}
