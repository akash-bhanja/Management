import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { Product } from '../entity/product.entity';
import { Stock } from 'src/entity/stock.entity';
import { Order } from 'src/entity/order.entity';
import { User } from 'src/entity/user.entity';

import { MailModule } from 'src/mail/mail.module'; // <-- Import MailModule

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Stock,
      Order,
      User,
    ]),
    MailModule, // <-- Add this
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}