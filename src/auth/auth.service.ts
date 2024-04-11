import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { log } from 'console';
import { use } from 'passport';
import { IUser } from 'src/auth/types/types';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден.');
    }

    const passwordIsMatch = await argon2.verify(user.password, password);
    if (passwordIsMatch) {
      const { password: _, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Неверный пароль.');
  }

  async login(user: IUser) {
    const { login, password } = user;
    return {
      login,
      password,
      token: this.jwtService.sign({
        login: user.login,
        password: user.password,
      }),
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'));
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
