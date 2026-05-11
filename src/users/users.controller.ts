import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { dot } from 'node:test/reporters';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() body: any) {
  //   return this.usersService.update(+id, body);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.usersService.delete(+id);
  // }
}
