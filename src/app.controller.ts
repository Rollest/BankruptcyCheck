import { Controller, Get, Param, Render, UsePipes, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { IUser } from './auth/types/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}

  @Get('')
  @Render('index')
  async getMainLogged(@Request() req) {
    let jwt = req.cookies['jwt']
    
    if(jwt){
      let jwtDecoded = await this.authService.validateToken(jwt)
      if(jwtDecoded != null){
        console.log("validated");
        return { userIsLoggedIn: true, username: jwtDecoded.login };
      }
    }
    console.log("not validated");
    return { userIsLoggedIn: false };
  }
}
