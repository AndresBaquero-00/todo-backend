import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { RoleEntity, UserEntity } from './entities';
import { CreateUserDTO, UpdateUserDTO } from './dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
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

  public async findAll(): Promise<Partial<UserEntity>[]> {
    return await this.userRepository.find({
      relations: { role: true },
      select: { role: { id: true, name: true } },
    });
  }

  public async findById(id: string): Promise<Partial<UserEntity>> {
    return await this.userRepository.findOne({
      relations: { role: true },
      select: { role: { id: true, name: true } },
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Partial<UserEntity>> {
    return await this.userRepository.findOne({
      relations: { role: true },
      select: { role: { id: true, name: true } },
      where: { email },
    });
  }

  public async create(user: CreateUserDTO): Promise<{ id: string }> {
    const role = await this.roleRepository.findOneBy({ id: user.role });
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
    const role = await this.roleRepository.findOneBy({ id: user.role });
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
