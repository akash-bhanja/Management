import {Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToMany, ManyToMany} from 'typeorm';
import { Role } from './role.entity';
import { Post } from 'src/address/entity/post.entity';
import { Department } from './department.entity';
import { Product } from './product.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Product, (product) => product.user)
  products!: Product[];

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department!: Department;

  @ManyToOne(() => Post, { nullable: true })
  @JoinColumn({ name: 'post_id' })
  posts!: Post;

}