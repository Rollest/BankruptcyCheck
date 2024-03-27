import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':isLogged')
  @Render('index')
  getMain(@Param('isLogged') isLogged: string) {
    return { userIsLoggedIn: isLogged === 'true' };
  }
}
