import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,UpdateDateColumn,Unique, OneToMany,
} from 'typeorm';
import { District } from './district.entity';

@Entity('police_stations')
@Unique(['name', 'district']) // Prevent duplicate station names in same district
export class PoliceStation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @ManyToOne(() => District, (district: District) => district.policeStations)
  @JoinColumn({ name: 'district_id' })
  district!: District;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}