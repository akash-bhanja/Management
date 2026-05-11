import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../entity/employee.entity';

@Entity()
export class Rolle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role_name!: string;

  @OneToMany(() => Employee, (employee: Employee) => employee.role)
  employees!: Employee[];
}