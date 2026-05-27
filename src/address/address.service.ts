import {Injectable,NotFoundException,} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';

import { Country } from './entity/country.entity';
import { State } from './entity/state.entity';
import { District } from './entity/district.entity';
import { PoliceStation } from './entity/police.entity';
import { Post } from './entity/post.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Country)
    private countryRepo: Repository<Country>,

    @InjectRepository(State)
    private stateRepo: Repository<State>,

    @InjectRepository(District)
    private districtRepo: Repository<District>,

    @InjectRepository(PoliceStation)
    private policeRepo: Repository<PoliceStation>,

    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  // ======================================================
  // COUNTRY CRUD
  // ======================================================

  async createCountry(name: string) {
    return await this.countryRepo.save({ name });
  }

  async getAllCountries() {
    return await this.countryRepo.find({
      relations: ['states'],
      order: { id: 'DESC' },
    });
  }

  async getCountryById(id: number) {
    const country = await this.countryRepo.findOne({
      where: { id },
      relations: ['states'],
    });

    if (!country) {
      throw new NotFoundException(
        'Country not found',
      );
    }

    return country;
  }

  async updateCountry(
    id: number,
    data: Partial<Country>,
  ) {
    const country = await this.getCountryById(id);

    Object.assign(country, data);

    return await this.countryRepo.save(country);
  }

  async deleteCountry(id: number) {
    const country = await this.getCountryById(id);

    await this.countryRepo.remove(country);

    return {
      message: 'Country deleted successfully',
    };
  }

  // ======================================================
  // STATE CRUD
  // ======================================================

 async createState(name: string, country_Id: number) {
  return await this.stateRepo.save({ name, country: { id: country_Id }, });
  }

  async getAllStates() {
    return await this.stateRepo.find({
      relations: ['country', 'districts'],
      order: { id: 'DESC' },
    });
  }

  async getStateById(id: number) {
    const state = await this.stateRepo.findOne({
      where: { id },
      relations: ['country', 'districts'],
    });

    if (!state) {
      throw new NotFoundException(
        'State not found',
      );
    }

    return state;
  }

  async updateState(
    id: number,
    data: Partial<State>,
  ) {
    const state = await this.getStateById(id);

    Object.assign(state, data);

    return await this.stateRepo.save(state);
  }

  async deleteState(id: number) {
    const state = await this.getStateById(id);

    await this.stateRepo.remove(state);

    return {
      message: 'State deleted successfully',
    };
  }



  // ======================================================
  // DISTRICT CRUD
  // ======================================================

  async createDistrict(name: string, state_Id: number) {
    return await this.districtRepo.save({name, state: {id: state_Id}});
 
  }

  async getAllDistricts() {
    return await this.districtRepo.find({
      relations: [
        'state',
        'policeStations',
        'posts',
      ],
      order: { id: 'DESC' },
    });
  }

  async getDistrictById(id: number) {
    const district =
      await this.districtRepo.findOne({
        where: { id },
        relations: [
          'state',
          'policeStations',
          'posts',
        ],
      });

    if (!district) {
      throw new NotFoundException(
        'District not found',
      );
    }

    return district;
  }

  async updateDistrict(
    id: number,
    data: Partial<District>,
  ) {
    const district =
      await this.getDistrictById(id);

    Object.assign(district, data);

    return await this.districtRepo.save(
      district,
    );
  }

  async deleteDistrict(id: number) {
    const district =
      await this.getDistrictById(id);

    await this.districtRepo.remove(district);

    return {
      message:
        'District deleted successfully',
    };
  }

  // ======================================================
  // POLICE STATION CRUD
  // ======================================================

  async createPoliceStation(name: string, district_Id: number) {
    return await this.policeRepo.save({name, district: {id: district_Id}});
  }

  async getAllPoliceStations() {
    return await this.policeRepo.find({
      relations: ['district'],
      order: { id: 'DESC' },
    });
  }

  async getPoliceStationById(id: number) {
    const police =
      await this.policeRepo.findOne({
        where: { id },
        relations: ['district'],
      });

    if (!police) {
      throw new NotFoundException(
        'Police Station not found',
      );
    }

    return police;
  }

  async updatePoliceStation(
    id: number,
    data: Partial<PoliceStation>,
  ) {
    const police =
      await this.getPoliceStationById(id);

    Object.assign(police, data);

    return await this.policeRepo.save(police);
  }

  async deletePoliceStation(id: number) {
    const police =
      await this.getPoliceStationById(id);

    await this.policeRepo.remove(police);

    return {
      message:
        'Police Station deleted successfully',
    };
  }

  // ======================================================
  // POST CRUD
  // ======================================================

  async createPost(name: string, pin_code: string, district_Id: number) {
    return await this.postRepo.save({name, pin_code, district: {id: district_Id}});
  }

  async getAllPosts() {
    return await this.postRepo.find({
      relations: ['district'],
      order: { id: 'DESC' },
    });
  }

  async getPostById(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['district'],
    });

    if (!post) {
      throw new NotFoundException(
        'Post not found',
      );
    }

    return post;
  }

  async updatePost(
    id: number,
    data: Partial<Post>,
  ) {
    const post = await this.getPostById(id);

    Object.assign(post, data);

    return await this.postRepo.save(post);
  }

  async deletePost(id: number) {
    const post = await this.getPostById(id);

    await this.postRepo.remove(post);

    return {
      message: 'Post deleted successfully',
    };
  }

  async getPostsByPinCode(pin_code: string) {
    const results = await this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.policeStations', 'policeStation')
      .leftJoinAndSelect('policeStation.district', 'district')
      .leftJoinAndSelect('district.state', 'state')
      .leftJoinAndSelect('state.country', 'country')
      .where('1')
      .getMany();

    if (results.length) {
      return {
        status: 1,
        message: 'Posts found for the given pin code',
        data: [],
      }
    }
  }  

    async getPoliceStationsFullDetails(name: string) {
        const results = await this.policeRepo
          .createQueryBuilder('policeStation')
          .leftJoinAndSelect('policeStation.district', 'district')
          .leftJoinAndSelect('district.state', 'state')
          .leftJoinAndSelect('state.country', 'country')
          .where('policeStation.name LIKE :name', { name: `%${name}%` })
          .getMany();
        
      return {
        status: 0,
        message: 'Police stations found for the given name',
        data: results,
      }
      }
      
    // const data = results.map(post => ({
    //   post_name: post.name,
    //   pin_code: post.pin_code,
    //   police_station: post.policeStations?.name,
    //   district: post.policeStations?.district.name,
    //   state: post.policeStations?.district.state.name,
    //   country: post.policeStations?.district.state.country.name,
    // }));

    // return {
    //   status: 1,
    //   message: 'Posts found for the given pin code',
    //   data,
    // };
  
}