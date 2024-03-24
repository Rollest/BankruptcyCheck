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
  ){}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { login: createUserDto.login},
    });

    if (userExists){
      throw new BadRequestException('Пользователь с таким логином уже зарегистрирован в системе.')
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    const user = new User();
    user.login = createUserDto.login;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return { user };
    //const token = this.jwtService.sign({ email: createUserDto.email });

    //return { user, token };
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {id}
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { login: updateUserDto.login},
    });

    if(updateUserDto.password){
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    };

    if (!userExists){
      throw new BadRequestException('Пользователя с таким id не существует');
    };
    return await this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.softDelete(id) // Soft delete the user
      .then(() => this.userRepository.update(id, { isActive: false })); // Update isActive to false
}
}
