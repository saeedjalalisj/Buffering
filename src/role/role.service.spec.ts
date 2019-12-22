import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Role} from './role.entity';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService],
      imports: [TypeOrmModule.forFeature([Role])],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined findById', () => {
    expect(service.findById).toBeDefined();
  });

  it('should be defined findByRole', () => {
    expect(service.findByRole).toBeDefined();
  });
});
