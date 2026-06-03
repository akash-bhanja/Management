import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,UpdateDateColumn,Unique, OneToMany, ManyToMany,} from 'typeorm';
import { District } from './district.entity';
import { PoliceStation } from './police.entity';
import { User } from 'src/entity/user.entity';

@Entity('posts')
@Unique(['name', 'district']) // Prevent duplicate names within same district
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @ManyToOne(() => District, (district: District) => district.posts)
  @JoinColumn({ name: 'district_id' })
  district!: District;

  @ManyToOne(() => PoliceStation, (policeStation: PoliceStation) => policeStation.posts)
  @JoinColumn({ name: 'police_station_id' })
  police_station!: PoliceStation;

  @ManyToMany(() => User, (user: User) => user.posts)
  users!: User[];

  @Column({ length: 10, nullable: true })
  pin_code!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}