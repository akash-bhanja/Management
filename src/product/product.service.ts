import {Injectable, NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { Stock } from 'src/entity/stock.entity';
import { Order } from 'src/entity/order.entity';
import { stat } from 'fs';
import { User } from 'src/entity/user.entity';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async create(product: Product): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, product: Product): Promise<Product> {
    const existingProduct = await this.findOne(id);

    Object.assign(existingProduct, product);

    return await this.productRepository.save(existingProduct);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return {
      message: 'Product deleted successfully',
    };
  }

  async addStock(product_Id: number, quantity: number, details: string) {
    const product = await this.findOne(product_Id);
     if (!product) {
      throw new NotFoundException('Product not found');
    }
    
    let stack = await this.stockRepository.findOne({
      where: { product: { id: product_Id } },
    });

    if (!stack) {
      stack = this.stockRepository.create({
        product,
        quantity,
        details,
      });
    } else {
      stack.quantity += quantity;
      stack.details = details;
    }
      
    await this.stockRepository.save(stack);

    return{
      message: 'Stock added successfully',
      data: stack,
    } ;
  }

  async productOrders(user_Id: number, product_Id: number, quantity: number, details: string) {

    const user = await this.userRepository.findOne({
      where: { id: user_Id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: product_Id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const stock = await this.stockRepository.findOne({
      where: { product: { id: product_Id } },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    if (!stock || stock.quantity < quantity) {
      throw new NotFoundException('Insufficient stock');
    }

    stock.quantity -= quantity;

    await this.stockRepository.save(stock);
    
    const order = this.orderRepository.create({
      user,
      product,
      quantity,
      details,
      price: product.price * quantity,
    });
    const saveOrder = await this.orderRepository.save(order);

    console.log('Order placed successfully:', order);

    await this.mailService.sendOrderConfirmationEmail(user,product,saveOrder);

    console.log('Email sent successfully to:', user.email);

    return {
      message: 'Order placed successfully',
      data: saveOrder,
    };

  }  
}