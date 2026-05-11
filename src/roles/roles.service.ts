import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(name: string) {
    const role = this.roleRepository.create({ name });
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  update(id: number, name: string) {
    return this.roleRepository.update(id, { name });
  }

  delete(id: number) {
    return this.roleRepository.delete(id);
  }
}
