import { Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}
    
    @Post('country')
    @ApiQuery({ name: 'name', type: String, description: 'Name of the country' })
    createCountry(name: string) {
        return this.addressService.createCountry(name);
    }
    
}
