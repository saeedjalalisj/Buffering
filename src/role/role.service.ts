import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async findById(roleId: string) {
        return await this.roleRepository.findOne({ where: { id: roleId } });
    }

    async findByRole(role: string) {
        return await this.roleRepository.findOne({ where: { title: role } });
    }
}
