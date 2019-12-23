import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import {Role} from './role.entity';

describe('RoleService', () => {
  let service: RoleService;
  let roleRepository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);

    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined findByRole', () => {
    expect(service.findById).toBeDefined();
  });

  it('findById return role by id', async () => {
    const result: Role = { title: '', id: 1, description: '' };
    const mockRleId = '1';
    jest.spyOn(roleRepository, 'findOne').mockResolvedValueOnce(result);
    expect( await service.findById(mockRleId)).toEqual(result);
  });

  it('should be defined findByRole', () => {
    expect(service.findByRole).toBeDefined();
  });

  it('findByRole return role by role name', async () => {
    const result: Role = { title: 'admin', id: 1, description: '' };
    const mockRleId = 'admin';
    jest.spyOn(roleRepository, 'findOne').mockResolvedValueOnce(result);
    expect( await service.findByRole(mockRleId)).toEqual(result);
  });
});
