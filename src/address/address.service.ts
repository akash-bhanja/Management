import { Injectable } from '@nestjs/common';
import { Country } from './entity/country.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entity/state.entity';
import { District } from './entity/district.entity';
import { PoliceStation } from './entity/police.entity';
import { Post } from './entity/post.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Country) private countryRepo: Repository<Country>,
        @InjectRepository(State) private stateRepo: Repository<State>,
        @InjectRepository(District) private districtRepo: Repository<District>,
        @InjectRepository(PoliceStation) private policeRepo: Repository<PoliceStation>,
        @InjectRepository(Post) private postRepo: Repository<Post>,
    ) {}

    async createCountry(name: string) {
        // const country = this.countryRepo.create({ name });
        return await this.countryRepo.save({ name });
    }

    async createState(name: string, countryId: number) {
        // const state = this.stateRepo.create({ name, countryId });
        return await this.stateRepo.save({ name, countryId });
    }

    async createDistrict(name: string, stateId: number) {
        // const district = this.districtRepo.create({ name, stateId });
        return await this.districtRepo.save({ name, stateId });
    }

    async createPoliceStation(name: string, districtId: number) {
        // const policeStation = this.policeRepo.create({ name, districtId });
        return await this.policeRepo.save({ name, districtId });
    }

    async createPost(name: string, districtId: number) {
        // const post = this.postRepo.create({ name, districtId });
        return await this.postRepo.save({ name, districtId });
    }


}