import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.rolesService.create(name);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('name') name: string) {
    return this.rolesService.update(+id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolesService.delete(+id);
  }
}
