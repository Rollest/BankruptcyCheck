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
    const law = new Law();
    law.heading = createLawDto.heading;
    law.mainText = createLawDto.mainText;
    law.releaseDate = createLawDto.releaseDate;

    return await this.lawRepository.save(law);
  }

  async findAll() {
    return await this.lawRepository.find();
  }

  async findOne(id: number) {
    return await this.lawRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateLawDto: UpdateLawDto) {
    const lawExists = await this.lawRepository.findOne({
      where: { id },
    });

    if (!lawExists) {
      throw new BadRequestException('Записи с таким id не существует');
    }
    return await this.lawRepository.save({
      ...lawExists,
      ...updateLawDto,
    });
  }

  permanentlyDelete(id: number) {
    return this.lawRepository.delete(id);
  }
}
