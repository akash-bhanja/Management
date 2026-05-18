import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,JoinColumn,CreateDateColumn,UpdateDateColumn,Unique,} from 'typeorm';
import { Country } from './country.entity';
import { District } from './district.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @ManyToOne(() => Country, (country: Country) => country.states, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @OneToMany(() => District, (district: District) => district.state)
  districts!: District[];

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}