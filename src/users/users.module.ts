import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './users.entity';
import { UsersController } from './users.controller';
import {RoleModule} from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
