import { Injectable } from '@nestjs/common';

import { UserRepository } from './user/user.repository';
import { RoleRepository } from './role/role.repository';

const roles = [
  { id: 1, name: 'Administrador' },
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
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  public async generateSeed(): Promise<void> {
    await this.roleRepository.save(roles);
    await this.userRepository.save(users);
  }
}
