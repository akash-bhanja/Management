import {Injectable,NotFoundException,} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Country } from './entity/country.entity';
import { State } from './entity/state.entity';
import { District } from './entity/district.entity';
import { PoliceStation } from './entity/police.entity';
import { Post } from './entity/post.entity';
import { User } from '../entity/user.entity';
import { Department } from 'src/entity/department.entity';

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

    @InjectRepository(User)
    private usersRepo: Repository<User>,

    @InjectRepository(Department)
    private departmentRepo: Repository<Department>
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

  async createPost(name: string, pin_code: string, district_Id: number, police_station_Id: number) {
    return await this.postRepo.save({name, pin_code, district: {id: district_Id}, police_station: {id: police_station_Id}});
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
      .leftJoinAndSelect('post.police_station', 'police')
      .leftJoinAndSelect('police.district', 'district')
      .leftJoinAndSelect('district.state', 'state')
      .leftJoinAndSelect('state.country', 'country')
      .where('post.pin_code = :pin_code', { pin_code })
      .getMany();


     const data = results.map(item => ({
      post_office: item.name,
      pin: item.pin_code,
      police_station: item.police_station?.name,
      district: item.police_station?.district?.name,
      state: item.police_station?.district?.state?.name,
      country: item.police_station?.district?.state?.country?.name,
    }));


    if (results.length) {
      return {
        status: 1,
        message: 'Posts found for the given pin code',
        data
      }
    }
  }


// 
    async getPoliceStationsFullDetails(name: string) {
        const results = await this.policeRepo
          .createQueryBuilder('policeStation')
          .leftJoinAndSelect('policeStation.district', 'district')
          .leftJoinAndSelect('district.state', 'state')
          .leftJoinAndSelect('state.country', 'country')
          .where('policeStation.name LIKE :name', { name: `%${name}%` })
          .getMany();

          const data = results.map(item => ({
            police_station: item.name,
            district: item.district?.name,
            state: item.district?.state?.name,
            country: item.district?.state?.country?.name,
          }));
        
      return {
        status: 0,
        message: 'Police stations found for the given name',
        data: data,
      }
    }
  
  // async getUserAddressByName(userName: string) {
  //   const results = await this.usersRepo
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.posts', 'post')
  //     .leftJoinAndSelect('post.police_station', 'policeStation')
  //     .leftJoinAndSelect('policeStation.district', 'district')
  //     .leftJoinAndSelect('district.state', 'state')
  //     .leftJoinAndSelect('state.country', 'country')
  //     .where('user.username LIKE :name', { name: `%${userName}%` })
  //     .getMany();

  //     const data = results.map(user => ({
  //       username: user.username,
  //       email: user.email, 
  //       post_id: user.posts.id,
  //       post_name: user.posts.name,
  //       police_station: user.posts.police_station?.name,
  //       district: user.posts.police_station?.district?.name,
  //       state: user.posts.police_station?.district?.state?.name,
  //       country: user.posts.police_station?.district?.state?.country?.name,
         
  //     }));

  //     if (results.length) {
  //       return {
  //         status: 1,
  //         message: 'User address details found for the given name',
  //         data: data,
  //       }
  //     } else {
  //       return {
  //         status: 0,
  //         message: 'No user address details found for the given name',
  //         data: [],
  //       }
  //     }
  //  }
    
  

  
// Using SubQuery to fetch user address details based on username
  async getUserAddressByName(userName: string) {
  const results = await this.usersRepo
    .createQueryBuilder('user')
    .select(['user.username', 'user.email', ])
    .addSelect((qb) => qb
      .subQuery()
      .select('p.id')
      .from(Post, 'p')
      .where('p.id = user.post_id'), 'post_id')

    .addSelect((qb) => qb
      .subQuery()
      .select('p.name')
      .from(Post, 'p')
      .where('p.id = user.post_id'), 'post_name'
      
    )

    .addSelect((qb) => qb
      .subQuery()
      .select('ps.name')
      .from(PoliceStation, 'ps')
      .where('ps.id = (SELECT p.police_station_id FROM posts p WHERE p.id = user.post_id)'), 'police_station'
    )

    .addSelect((qb) => qb
      .subQuery()
      .select('d.name')
      .from(District, 'd')
      .where('d.id = (SELECT ps.district_id FROM police_stations ps WHERE ps.id = (SELECT p.police_station_id FROM posts p WHERE p.id = user.post_id))'), 'district'
    )

    .addSelect((qb) => qb
      .subQuery()
      .select('s.name')
      .from(State, 's')
      .where('s.id = (SELECT d.state_id FROM districts d WHERE d.id = (SELECT ps.district_id FROM police_stations ps WHERE ps.id = (SELECT p.police_station_id FROM posts p WHERE p.id = user.post_id)))'), 'state'
    )

    .addSelect((qb) => qb
      .subQuery()
      .select('c.name')
      .from(Country, 'c')
      .where('c.id = (SELECT s.country_id FROM states s WHERE s.id = (SELECT d.state_id FROM districts d WHERE d.id = (SELECT ps.district_id FROM police_stations ps WHERE ps.id = (SELECT p.police_station_id FROM posts p WHERE p.id = user.post_id))))'), 'country'
    )

    .where('user.username LIKE :name', {name: `%${userName}%`,})
    .getRawMany();

  return results.length
    ? {
        status: 1,
        message: 'User address details found for the given name',
        data: results,
      }
    : {
        status: 0,
        message: 'No user address details found for the given name',
        data: [],
      };
}


async getUsersByDepartmentName(departmentName: string) {
  
  const department = await this.departmentRepo
    .createQueryBuilder('department')
    .leftJoinAndSelect('department.users', 'users')
    .leftJoinAndSelect('users.role', 'role')
    .leftJoinAndSelect('users.posts', 'posts')
    .leftJoinAndSelect('posts.police_station', 'policeStation')
    .leftJoinAndSelect('policeStation.district', 'district')
    .leftJoinAndSelect('district.state', 'state')
    .leftJoinAndSelect('state.country', 'country')
    .where('department.name = :departmentName', { departmentName })
    .getMany();



    const usersData = department.map(dep => ({
      department: dep.name,
      users: dep.users.map(user => ({
        username: user.username,
        email: user.email,
        role: dep.users.map(user => user.role?.name || 'N/A'),
      })),
      
      posts: dep.users.map(user => ({
        post_name: user.posts?.name || 'N/A',
        police_station: user.posts?.police_station?.name || 'N/A',
        district: user.posts?.police_station?.district?.name || 'N/A',
        state: user.posts?.police_station?.district?.state?.name || 'N/A',
        country: user.posts?.police_station?.district?.state?.country?.name || 'N/A',
      })),
    }));

  if (!department) {
    throw new NotFoundException('Department not found');
  }

  return{users: usersData};

}
}