import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,JoinColumn, ManyToOne,} from 'typeorm';
import { Product } from './product.entity';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ default: 0 })
  quantity!: number;

  @Column('text', { nullable: true })
  details!: string;

}