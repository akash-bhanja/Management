import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async login(LoginDto: any) {
    const user = await this.validateUser(
      LoginDto.email,
      LoginDto.password,
    );

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role.name, // since you use roles table
    };

    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }
  async getProfile(tokenId: string) {
    const decoded = this.jwtService.decode(tokenId) as any;
    const user = await this.usersService.findOne(parseInt(decoded.sub));
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      username: user.username,
    };
  }
}
