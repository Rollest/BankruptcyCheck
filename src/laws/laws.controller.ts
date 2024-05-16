import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { CreateLawDto } from './dto/create-law.dto';
import { UpdateLawDto } from './dto/update-law.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LawsService } from './laws.service';

@Controller('laws')
export class LawsController {
  constructor(private readonly lawService: LawsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createlawDto: CreateLawDto) {
    console.log(createlawDto);

    return this.lawService.create(createlawDto);
  }

  @Get()
  findAll() {
    return this.lawService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lawService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatelawDto: UpdateLawDto) {
    console.log(updatelawDto);
    return this.lawService.update(+id, updatelawDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.lawService.permanentlyDelete(+id);
  }
}
