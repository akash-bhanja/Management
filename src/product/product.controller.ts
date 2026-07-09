import { Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @ApiTags('Product')
    @Post('add-stock')
    async addStock(
        @Query('product_Id') product_Id: number,
        @Query('quantity') quantity: number,
        @Query('details') details: string,
    ) {
        return await this.productService.addStock( Number(product_Id), Number(quantity), String(details));
    }

    @ApiTags('Product')
    @Post('product-orders')
    async productOrders(
        @Query('user_Id') user_Id: number,
        @Query('product_Id') product_Id: number,
        @Query('quantity') quantity: number,
        @Query('details') details: string,
    ) {
        return await this.productService.productOrders(Number(user_Id), Number(product_Id), Number(quantity), String(details));
    }
}
