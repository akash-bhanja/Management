// employee.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entity/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Department } from 'src/entity/department.entity';
import { Rolle } from 'src/entity/rolle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Department,
      Rolle,
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
