import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { RoleRepository } from 'src/role/role.repository';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserEntity } from './entities';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  public constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  private async exists(id: string): Promise<void> {
    try {
      const exists = await this.userRepository.existsBy({ id });
      if (exists === false) {
        throw new BadRequestException('El ID del usuario no existe.');
      }
    } catch (e: unknown) {
      const err = e as QueryFailedError;
      console.log(err.message);
      throw new BadRequestException('El ID del usuario no existe.');
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  public async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findByEmail(email);
  }

  public async create(user: CreateUserDTO): Promise<{ id: string }> {
    const role = await this.roleRepository.findById(user.role);
    try {
      const saved = await this.userRepository.save({
        ...user,
        role: role,
      });

      return { id: saved.id };
    } catch (e: unknown) {
      const err = e as QueryFailedError;
      console.log(err.message);
      throw new BadRequestException('El correo a registrar ya existe.');
    }
  }

  public async update(id: string, user: UpdateUserDTO): Promise<void> {
    await this.exists(id);

    const role = await this.roleRepository.findById(user.role);
    try {
      await this.userRepository.update(
        { id },
        {
          ...user,
          role: role,
        },
      );
    } catch (e: unknown) {
      const err = e as QueryFailedError;
      console.log(err.message);
      throw new BadRequestException('El correo a actualizar ya existe.');
    }
  }

  public async delete(id: string): Promise<void> {
    await this.exists(id);
    await this.userRepository.delete({ id });
  }
}
