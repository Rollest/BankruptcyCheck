import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  async validateJWT(req) {
    let jwt = req.cookies['jwt'];

    if (jwt) {
      let jwtDecoded = await this.authService.validateToken(jwt);
      if (jwtDecoded != null) {
        let isAdmin = (await this.usersService.findOneByLogin(jwtDecoded.login))
          .isAdmin;
        console.log('validated');
        return {
          userIsLoggedIn: true,
          username: jwtDecoded.login,
          isAdmin: isAdmin,
        };
      }
    }
    console.log('not validated');
    return { userIsLoggedIn: false };
  }

  async validateJWTAdmin(req) {
    let jwt = req.cookies['jwt'];

    if (jwt) {
      let jwtDecoded = await this.authService.validateToken(jwt);
      if (jwtDecoded != null) {
        let isAdmin = (await this.usersService.findOneByLogin(jwtDecoded.login))
          .isAdmin;
        if (isAdmin == true) {
          console.log('validated');
          return {
            userIsLoggedIn: true,
            username: jwtDecoded.login,
            isAdmin: isAdmin,
          };
        } else {
          throw UnauthorizedException;
        }
      }
    }
    console.log('not validated');
    throw UnauthorizedException;
  }
}
