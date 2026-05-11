import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn, OneToMany,} from 'typeorm';
import { State } from './state.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => State, (state: State) => state.country)
  state!: State[];
}