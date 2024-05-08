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
import { lawService } from './law.service';
import { CreateLawDto } from './dto/create-law.dto';
import { UpdateLawDto } from './dto/update-law.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('law')
export class LawsController {
  constructor(private readonly lawService: lawService) {}

  @Post()
  create(@Body() createlawDto: CreateLawDto) {
    console.log(createlawDto);

    return this.lawService.create(createlawDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.lawService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
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
    return this.lawService.remove(+id);
  }

  @Delete('permanent/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  permanentlyDelete(@Param('id') id: string) {
    return this.lawService.permanentlyDelete(+id);
  }
}
