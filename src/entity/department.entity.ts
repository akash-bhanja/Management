import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../entity/employee.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Employee, (employee: Employee) => employee.department)
  employees!: Employee[];
}