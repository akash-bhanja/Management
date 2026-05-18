import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,UpdateDateColumn, OneToMany,} from 'typeorm';
import { State } from './state.entity';
import { PoliceStation } from './police.entity';
import { Post } from './post.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @ManyToOne(() => State, (state: State) => state.districts)
  @JoinColumn({ name: 'state_id' })
  state!: State;

  @OneToMany(() => PoliceStation, (policeStation: PoliceStation) => policeStation.district)
  policeStations!: PoliceStation[];

  @OneToMany(() => Post, (post: Post) => post.district)
  posts!: Post[];

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}