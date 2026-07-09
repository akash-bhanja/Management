import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,JoinColumn, ManyToOne,} from 'typeorm';
import { User } from './user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ length: 150 })
  name!: string;

  @Column('text', { nullable: true })
  description!: string;

  @Column('decimal', {precision: 10,scale: 2,default: 0,})
  price!: number;

  @Column({ length: 100, nullable: true })
  category!: string;


}