import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLawDto } from './dto/create-law.dto';
import { UpdateLawDto } from './dto/update-law.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Law } from './entities/law.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class LawsService {
  constructor(
    @InjectRepository(Law)
    private readonly lawRepository: Repository<Law>,
  ) {}

  async create(createLawDto: CreateLawDto) {
    const userExists = await this.lawRepository.findOne({
      where: { login: createLawDto.login },
    });

    if (userExists) {
      throw new BadRequestException(
        'Пользователь с таким логином уже зарегистрирован в системе.',
      );
    }

    const hashedPassword = await argon2.hash(createLawDto.password, {
      type: argon2.argon2id,
    });

    const user = new Law();
    user.login = createLawDto.login;
    user.password = hashedPassword;

    await this.lawRepository.save(user);

    return true;
  }

  async findAll() {
    return await this.lawRepository.find();
  }

  async findOne(id: number) {
    return await this.lawRepository.findOne({
      where: { id },
    });
  }

  async findOneByLogin(login: string) {
    return await this.lawRepository.findOne({
      where: { login },
    });
  }

  async update(id: number, updateLawDto: UpdateLawDto) {
    const userExists = await this.lawRepository.findOne({
      where: { id },
    });

    if (!userExists) {
      throw new BadRequestException('Пользователя с таким id не существует');
    }

    if (updateLawDto.password != null) {
      updateLawDto.password = await argon2.hash(updateLawDto.password, {
        type: argon2.argon2id,
      });
    }

    return await this.lawRepository.save({
      ...userExists,
      ...updateLawDto,
    });
  }

  remove(id: number) {
    return this.lawRepository
      .softDelete(id)
      .then(() => this.lawRepository.update(id, { isActive: false }));
  }

  permanentlyDelete(id: number) {
    return this.lawRepository.delete(id);
  }
}
