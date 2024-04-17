import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}
  async validateJWT(req) {
    let jwt = req.cookies['jwt'];

    if (jwt) {
      let jwtDecoded = await this.authService.validateToken(jwt);
      if (jwtDecoded != null) {
        console.log('validated');
        return { userIsLoggedIn: true, username: jwtDecoded.login };
      }
    }
    console.log('not validated');
    return { userIsLoggedIn: false };
  }
}
