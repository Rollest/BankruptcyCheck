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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.usersService.create(createUserDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete('permanent/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  permanentlyDelete(@Param('id') id: string) {
    return this.usersService.permanentlyDelete(+id);
  }
}
