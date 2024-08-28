import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity, UserEntity } from './user/entities';

const roles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Coordinador' },
  { id: 3, name: 'Docente' },
  { id: 4, name: 'Estudiante' },
];

const users = [
  {
    firstName: 'Andrés',
    lastName: 'Baquero',
    email: 'email@email.com',
    phone: '3112401388',
    role: roles[0],
  },
];

@Injectable()
export class AppService {
  public constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  public async generateSeed(): Promise<void> {
    await this.roleRepository.save(roles);
    await this.userRepository.save(users);
  }
}
