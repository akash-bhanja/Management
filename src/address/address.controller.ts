import {Body,Controller,Delete,Get,Param,ParseIntPipe,Post,Put, Query,} from '@nestjs/common';

import { AddressService } from './address.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  // ======================================================
  // COUNTRY APIs
  // ======================================================

  @Post('country/create')
  @ApiQuery({
    name: 'name',
    description: 'Country name',
    type: String,
    example: 'India',
    required: true,
  })
  createCountry(@Query('name') name: string) {
    return this.addressService.createCountry(name);
  }

  @Get('country/all')
  getAllCountries() {
    return this.addressService.getAllCountries();
  }

  @Get('country/:id')
  getCountryById(
    @Param('id') id: number,
  ) {
    return this.addressService.getCountryById(
      id,
    );
  }

  @Put('country/:id')
  updateCountry(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.addressService.updateCountry(
      id,
      body,
    );
  }

  @Delete('country/:id')
  deleteCountry(
    @Param('id') id: number,
  ) {
    return this.addressService.deleteCountry(
      id,
    );
  }

  // ======================================================
  // STATE APIs
  // ======================================================

 @Post('state/create')
@ApiQuery({ name: 'name',description: 'State name',type: String,example: 'Maharashtra',required: true,})
@ApiQuery({name: 'country_Id',description: 'ID of the country this state belongs to',type: Number,example: 1,required: true,})

createState( @Query('name') name: string,
             @Query('country_Id') country_Id: string,) {
  return this.addressService.createState(name, Number(country_Id));
  }





  @Get('state/all')
  getAllStates() {
    return this.addressService.getAllStates();
  }

  @Get('state/:id')
  getStateById(
    @Param('id') id: number,
  ) {
    return this.addressService.getStateById(id);
  }

  @Put('state/:id')
  updateState(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.addressService.updateState(
      id,
      body,
    );
  }

  @Delete('state/:id')
  deleteState(
    @Param('id') id: number,
  ) {
    return this.addressService.deleteState(id);
  }

  // ======================================================
  // DISTRICT APIs
  // ======================================================

  @Post('district/create')
  @ApiQuery({
    name: 'name',
    description: 'District name',
    type: String,
    example: 'Mumbai',
    required: true,   
  })
  @ApiQuery({
    name: 'state_Id',
    description: 'ID of the state this district belongs to',
    type: Number,
    example: 1,
    required: true, 
  })
  createDistrict(@Query('name') name: string, @Query('state_Id') state_Id: number) {
    return this.addressService.createDistrict(name, state_Id);
  }

  @Get('district/all')
  getAllDistricts() {
    return this.addressService.getAllDistricts();
  }

  @Get('district/:id')
  getDistrictById(
    @Param('id') id: number,
  ) {
    return this.addressService.getDistrictById(
      id,
    );
  }

  @Put('district/:id')
  updateDistrict(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.addressService.updateDistrict(
      id,
      body,
    );
  }

  @Delete('district/:id')
  deleteDistrict(
    @Param('id') id: number,
  ) {
    return this.addressService.deleteDistrict(
      id,
    );
  }

  // ======================================================
  // POLICE STATION APIs
  // ======================================================

  @Post('police/create')
  @ApiQuery({
    name: 'name',
    description: 'Police station name',
    type: String,
    example: 'Mumbai Police Station',
    required: true,   
  })
  @ApiQuery({
    name: 'district_Id',
    description: 'ID of the district this police station belongs to',
    type: Number,
    example: 1,
    required: true,
  })
  createPolice(@Query('name') name: string, @Query('district_Id') district_Id: number) {
    return this.addressService.createPoliceStation(name, district_Id);
  }

  @Get('police/all')
  getAllPolice() {
    return this.addressService.getAllPoliceStations();
  }

  @Get('police/:id')
  getPoliceById(
    @Param('id') id: number,
  ) {
    return this.addressService.getPoliceStationById(
      id,
    );
  }

  @Put('police/:id')
  updatePolice(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.addressService.updatePoliceStation(
      id,
      body,
    );
  }

  @Delete('police/:id')
  deletePolice(
    @Param('id') id: number,
  ) {
    return this.addressService.deletePoliceStation(
      id,
    );
  }

  // ======================================================
  // POST APIs
  // ======================================================


  @ApiTags('Post')
  @Post('post/create')
  @ApiQuery({name: 'name',description: 'Post name',type: String,example: 'Mumbai Post Office',required: true,   })
  @ApiQuery({name: 'pin_code',description: 'PIN Code',type: String,example: '400001',required: true,})
  @ApiQuery({name: 'district_Id',description: 'ID of the district this post belongs to',type: Number,example: 1,required: true,})
  @ApiQuery({name: 'police_station_Id',description: 'ID of the police station this post belongs to',type: Number,example: 1,required: true,})
  createPost(@Query('name') name: string,
             @Query('pin_code') pin_code: string, 
             @Query('district_Id') district_Id: number,
             @Query('police_station_Id') police_station_Id: number) {
    return this.addressService.createPost(name, pin_code, district_Id, police_station_Id);
  }


//   @Get('post/all')
//   getAllPosts() {
//     return this.addressService.getAllPosts();
//   }

//   @Get('post/:id')
//   getPostById(
//     @Param('id') id: number,
//   ) {
//     return this.addressService.getPostById(id);
//   }

//   @Put('post/:id')
//   updatePost(
//     @Param('id') id: number,
//     @Body() body: any,
//   ) {
//     return this.addressService.updatePost(
//       id,
//       body,
//     );
//   }

//   @Delete('post/:id')
//   deletePost(
//     @Param('id') id: number,
//   ) {
//     return this.addressService.deletePost(id);
//   }
@ApiTags('Post')
   @Get('/details/pincode')
   @ApiQuery({  name: 'pin_code',  required: true,  example: '400001',})
  async getPostsByPinCode( @Query('pin_code') pin_code: string,) {
     return this.addressService.getPostsByPinCode(pin_code);
  }





   @ApiTags('Police')
  @Get('police/details')
  @ApiQuery({
    name: 'name',
    description: 'Police station name',
    type: String,
    example: 'Mumbai Police Station',
    required: true,
  })




  getPoliceStationsFullDetails(@Query('name') name: string) {
    return this.addressService.getPoliceStationsFullDetails(name);
  }

}