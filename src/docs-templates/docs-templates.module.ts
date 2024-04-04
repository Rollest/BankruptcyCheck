import { Module } from '@nestjs/common';
import { DocsTemplatesController } from './docs-templates.controller';
import { DocsTemplatesService } from './docs-templates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsTemplate } from './entities/docs-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocsTemplate])],
  controllers: [DocsTemplatesController],
  providers: [DocsTemplatesService],
})
export class DocsTemplatesModule {}
