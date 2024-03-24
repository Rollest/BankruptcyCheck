import { MinLength } from 'class-validator';

export class CreateUserDto {
    @MinLength(6, { message: 'Login should contain more than 5 symbols.' })
    login: string;

    @MinLength(6, { message: 'Password should contain more than 5 symbols.' })
    password: string;
}
