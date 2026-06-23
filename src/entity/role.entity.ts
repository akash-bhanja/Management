import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
// import { Employee } from './employee.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, user => user.role)
  users!: User[];

  // @OneToMany(() => Employee, (employee) => employee.role)
  // employees!: Employee[];
}