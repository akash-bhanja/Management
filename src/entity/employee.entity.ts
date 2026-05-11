import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Department } from '../entity/department.entity';
import { Rolle } from '../entity/rolle.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: false,
  })
  @JoinColumn({ name: 'department_id' })
  department!: Department;

  @ManyToOne(() => Rolle, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role!: Rolle;
}