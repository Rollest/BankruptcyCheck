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
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  getPath(@Param('name') name: string, @Res() res: Response) {
    //const path = this.docsTemplateService.getPath(name);
    const filestream = createReadStream('public/templates/' + name);
    const nameSplit = name.split('.');
    const format = nameSplit[nameSplit.length - 1];
    switch (format) {
      case 'docx':
        res.type('.docx');
      case 'pdf':
        res.type('.pdf');
    }
    res.attachment();
    filestream.pipe(res);
  }
}
