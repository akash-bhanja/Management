import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,UpdateDateColumn,Unique, OneToMany,
} from 'typeorm';
import { District } from './district.entity';

@Entity('police_stations')
@Unique(['name', 'district_id']) // Prevent duplicate station names in same district
export class PoliceStation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  name!: string;

  @ManyToOne(() => District, (district: District) => district.police_stations)
  @JoinColumn({ name: 'district_id' })
  district!: District;

  @Column({ length: 255, nullable: true })
  address!: string;

  @Column({ length: 15, nullable: true })
  contact_number!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}