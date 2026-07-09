import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,JoinColumn, ManyToOne,} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';


@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ default: 0 })
  quantity!: number;

  @Column({ length: 255, nullable: true })
  details!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date!: Date;

  @Column('decimal', {precision: 10,scale: 2,default: 0,})
  price!: number;
}