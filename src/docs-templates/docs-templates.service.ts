import { Injectable } from '@nestjs/common';
import { DocsTemplate } from './entities/docs-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

@Injectable()
export class DocsTemplatesService {
  constructor(
    @InjectRepository(DocsTemplate)
    private readonly docsTemplatesRepository: Repository<DocsTemplate>,
  ) {}

  async getPath(name: string) {
    const template = await this.docsTemplatesRepository.findOne({
      where: { name },
    });
    return template.path;
  }
}
