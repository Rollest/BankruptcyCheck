import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { login: createUserDto.login },
    });

    if (userExists) {
      throw new BadRequestException(
        'Пользователь с таким логином уже зарегистрирован в системе.',
      );
    }

    const hashedPassword = await argon2.hash(createUserDto.password, {
      type: argon2.argon2id,
    });

    const user = new User();
    user.login = createUserDto.login;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return true;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { login: updateUserDto.login },
    });

    if (!userExists) {
      throw new BadRequestException('Пользователя с таким id не существует');
    }

    const isAdmin = updateUserDto.isAdmin === 'true'; // Преобразуем строку 'true' в true
    const isActive = updateUserDto.isActive === 'true'; // Преобразуем строку 'true' в true

    return await this.userRepository.save({
      ...userExists,
      ...updateUserDto,
      isAdmin, // Присваиваем преобразованные значения
      isActive, // Присваиваем преобразованные значения
    });
  }

  remove(id: number) {
    return this.userRepository
      .softDelete(id)
      .then(() => this.userRepository.update(id, { isActive: false }));
  }
}
