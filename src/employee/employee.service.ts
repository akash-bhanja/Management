import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Employee } from '../entity/employee.entity';
import { Department } from 'src/entity/department.entity';
import { Rolle } from 'src/entity/rolle.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)private employeeRepo: Repository<Employee>,
    @InjectRepository(Department)private deptRepo: Repository<Department>,
     @InjectRepository(Rolle)private rollRepo: Repository<Rolle>,) {}

//,,,,,,,,



  async create(dto: CreateEmployeeDto) {
    // ✅ Apply defaults (THIS IS THE FIX)
    const name = dto.name ?? 'om';
    const email = dto.email ?? `om${Date.now()}@example.com`;
    const departmentId = dto.department_id ?? 1;
    const roleId = dto.role_id ?? 2;

    // ✅ Check duplicate email
    const exists = await this.employeeRepo.findOne({ where: { email } });
    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    // ✅ Validate department
    const department = await this.deptRepo.findOne({
      where: { id: departmentId },
    });
    if (!department) {
      throw new BadRequestException('Department not found');
    }

    // ✅ Validate role
    const role = await this.rollRepo.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }

    // ✅ Create employee
    const employee = this.employeeRepo.create({
      name,
      email,
      department,
      role,
    });

    const saved = await this.employeeRepo.save(employee);

    return {
      statusCode: 0,
      message: 'Employee created successfully',
      data: saved,
    };
  }

  // ✅ Get all with relations
  async findAll() {
    const data = await this.employeeRepo.find({
      relations: ['department', 'role'],
    });

    return {
      statusCode: 0,
      message: 'Success',
      data,
    };
  }


  // ✅ FIND ALL
  // async findAll() {
  //   return this.employeeRepo.find({
  //     relations: ['department', 'role'],
  //   });
  // }

  // ✅ FIND ONE
  async findOne(id: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ['department', 'role'],
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  // ✅ UPDATE
  async update(id: number, dto: any) {
    const employee = await this.findOne(id);

    if (dto.name !== undefined) {
      employee.name = dto.name;
    }

    if (dto.email !== undefined) {
      employee.email = dto.email;
    }

    if (dto.department_id !== undefined) {
      const department = await this.deptRepo.findOne({
        where: { id: dto.department_id },
      });

      if (!department) {
        throw new NotFoundException('Department not found');
      }

      employee.department = department;
    }

    if (dto.rolle_id !== undefined) {
      const role = await this.rollRepo.findOne({
        where: { id: dto.rolle_id },
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }
      employee.role = role;
      
    }

    return this.employeeRepo.save(employee);
  }

  // ✅ DELETE
  async delete(id: number) {
    const employee = await this.findOne(id);

    await this.employeeRepo.remove(employee);

    return { message: 'Employee deleted successfully' };
  }
}