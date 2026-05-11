import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,UpdateDateColumn,Unique,} from 'typeorm';
import { District } from './district.entity';

@Entity('posts')
@Unique(['name', 'district_id']) // Prevent duplicate names within same district
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @ManyToOne(() => District, (district: District) => district.posts)
  @JoinColumn({ name: 'district_id' })
  district!: District;

  @Column({ length: 10, nullable: true })
  pin_code!: string;

  @Column({ length: 255, nullable: true })
  address!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}