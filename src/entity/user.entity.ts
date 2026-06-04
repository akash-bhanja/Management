import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Rolle } from '../entity/rolle.entity';
import { Post } from 'src/address/entity/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Rolle)
  @JoinColumn({ name: 'role_id' })
  role!: Rolle;

   

@ManyToOne(() => Post, { nullable: true })
@JoinColumn({ name: 'post_id' })
post!: Post;
}