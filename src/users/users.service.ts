import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Users} from './users.entity';
import {InjectRepository} from '@nestjs/typeorm';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
      @InjectRepository(Users)
      private readonly userRepository: Repository<Users>,
  ) {
    this.users = [
      {
        userId: 1,
        username: 'test1',
        password: 'pass1',
      },
      {
        userId: 2,
        username: 'test2',
        password: 'pass2',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }
}
