import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersDto } from './dto/users.dto';
import {RoleService} from '../role/role.service';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly roleService: RoleService,
  ) {}

  async findById(userId: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async create(userDto: UsersDto) {
    try {
      // because @beforeInsert not working
      // https://github.com/typeorm/typeorm/issues/674
      const entity = Object.assign(new User(), userDto);
      const role = await this.roleService.findByRole('user');
      entity.role = role.id;
      return await this.userRepository.save(entity);
    } catch (e) {
      if (e.errno === 1062) {
        throw new HttpException('ConflictException', HttpStatus.CONFLICT);
      }
      throw new HttpException('InternalServerErrorException', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
