import { MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(6, { message: 'Login should contain more than 5 symbols.' })
  login: string;

  @IsOptional()
  @MinLength(6, { message: 'Password should contain more than 5 symbols.' })
  password: string;

  @IsOptional()
  isAdmin: string;

  @IsOptional()
  isActive: string;
}
