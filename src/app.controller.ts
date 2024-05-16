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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('laws-page')
  @Render('laws/laws')
  async getLaws(@Request() req) {
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
  @Render('policy/policy')
  async getPolicy(@Param('name') name: string) {
    return { policy: name };
  }

  @Get('admin')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Render('admin/admin')
  async getAdmin(@Request() req) {
    return await this.appService.validateJWTAdmin(req);
  }
}
