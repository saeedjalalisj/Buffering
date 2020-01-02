import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import {UsersDto} from '../users/dto/users.dto';
import { IPayload } from './auth.interface';
import { jwtConstants } from './auth.constants';

// todo: add role from db to user
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UsersDto) {
    const user = await this.usersService.findByUsername(userDto.username);
    if (!user) {
      throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);
    }
    const payload = { username: user.username, sub: user.id, roles: user.role};
    return {
      access_token: this.createToken(payload),
    };
  }

  async register(userDto: UsersDto ) {
    const user = await this.usersService.create(userDto);
    if (user) {
      const payload = { username: user.username, sub: user.id, roles: user.role };
      return {
        access_token: this.createToken(payload),
      };
    }
  }

  createToken(payload: IPayload) {
    return this.jwtService.sign(payload, { expiresIn: jwtConstants.expiresIn });
  }
}
