import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { IUserLogin } from '../users/users.interface';
import {UserDto} from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userInfo: IUserLogin) {
    // const payload = { username: userInfo.username, sub: userInfo.id };
    const payload = { };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserDto ) {
    // TODO: add exceptions
    const user = await this.usersService.create(userDto);
    if (user) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
