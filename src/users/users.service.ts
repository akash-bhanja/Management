import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(dto:CreateUserDto) {
    const role = await this.roleRepository.findOne({
      where: { id: dto.role_id },
    });

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      role: role || undefined,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({ relations: ['role'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async update(id: number, data: any) {
    return this.userRepository.update(id, data);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
