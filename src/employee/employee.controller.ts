// import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
// import { EmployeeService } from './employee.service';
// import { CreateEmployeeDto } from './dto/create-employee.dto';

// @Controller('employees')
// export class EmployeeController {
//   constructor(private readonly employeeService: EmployeeService) {}

  
//   @Post()
//   create(@Body() dto: CreateEmployeeDto) {
//     return this.employeeService.create(dto);
//   }

  // @Get()
  // getAll() {
  //   return this.employeeService.findAll();
  // }

  // @Get(':id')
  // getOne(@Param('id') id: number) {
  //   return this.employeeService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() dto: CreateEmployeeDto) {
  //   return this.employeeService.update(+id, dto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: number) {
  //   return this.employeeService.delete(+id);
  // }
// }


import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

//  @Post('create')
// create(@Body() dto: Partial<CreateEmployeeDto>) {
//   const finalDto: CreateEmployeeDto = {
//     name: dto.name ?? 'om',
//     email: dto.email ?? 'om@example.com',
//     department_id: dto.department_id ?? 1,
//     role_id: dto.role_id ?? 2,
//   };
//   return this.employeeService.create(finalDto);
// }

// {
//   "name": "om",
//   "email": "om@example.com",
//   "department_id": 1,
//   "role_id": 2
// }

@Post('create')
@ApiBody({
  schema: {
    example: {
      name: 'om',
      email: 'om@example.com',
      department_id: 1,
      role_id: 1,
    },
  },
})
create(@Body() dto: CreateEmployeeDto) {
  return this.employeeService.create(dto);
}

  
  @Get('all')
  findAll() {
    return this.employeeService.findAll();
  }
  // @Get('list')
  // findAll() {
  //   return this.employeeService.findAll();
  // }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(parseInt(id));
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.employeeService.update(parseInt(id), dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.employeeService.delete(parseInt(id));
  }
}