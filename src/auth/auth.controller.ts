import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    console.log('login');
    let authRes = await this.authService.login(req.user);
    response.cookie('jwt', authRes.token, { maxAge: 1000 * 60 * 60 * 24 });
    return authRes;
  }

  @Get('signout')
  @UseGuards(JwtAuthGuard)
  signout(@Res({ passthrough: true }) response: Response) {
    response.cookie('jwt', '', { expires: new Date(), httpOnly: true });
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
