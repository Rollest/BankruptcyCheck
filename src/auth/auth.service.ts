import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { log } from 'console';
import { use } from 'passport';
import { IUser } from 'src/auth/types/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
      private readonly userService: UsersService,
      private readonly jwtService: JwtService
      ){}

    async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (user && passwordIsMatch) {
      const { password, ...result } = user;
      return user;
    }
    console.log("validateUser");
    
    throw new UnauthorizedException('User or password are incorrect.')
  }

  async login(user: IUser) {
    const {id, login} = user
    return{
      id,
      login,
      token: this.jwtService.sign({id: user.id, login: user.login})
    }
  }
}
