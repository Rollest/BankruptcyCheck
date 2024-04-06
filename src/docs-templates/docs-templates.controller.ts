import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DocsTemplatesService } from './docs-templates.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { createReadStream } from 'fs';

@Controller('docs-templates')
export class DocsTemplatesController {
  constructor(private readonly docsTemplateService: DocsTemplatesService) {}

  @Get(':name')
  //@UsePipes(new ValidationPipe())
  //@UseGuards(JwtAuthGuard)
  getPath(@Param('name') name: string, @Res() res: Response) {
    //const path = this.docsTemplateService.getPath(name);
    const filestream = createReadStream('templates/' + name + '.docx');
    res.type('.docx');
    res.attachment();
    filestream.pipe(res);
  }
}
