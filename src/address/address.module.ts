import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PoliceStation } from './entity/police.entity';
import { District } from './entity/district.entity';
import { State } from './entity/state.entity';
import { Country } from './entity/country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { User } from 'src/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Country, State, District, PoliceStation, Post, User])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
