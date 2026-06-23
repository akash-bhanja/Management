import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';

import { District } from './district.entity';
import { PoliceStation } from './police.entity';
import { User } from 'src/entity/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  // @ManyToOne(() => District, (district) => district.posts)
  // @JoinColumn({ name: 'district_id' })
  // district!: District;

  @ManyToOne(
    () => PoliceStation,
    (policeStation) => policeStation.posts,
  )
  @JoinColumn({ name: 'police_station_id' })
  police_station!: PoliceStation;

  @OneToMany(() => User, (user: User) => user.posts)
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