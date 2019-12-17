import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
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

  async create(userDto: UserDto) {
    try {
      // because @beforeInsert not working
      // https://github.com/typeorm/typeorm/issues/674
      const entity = Object.assign(new User(), userDto);
      return await this.userRepository.save(entity);
    } catch (e) {
      console.error(e);
    }
  }

}
