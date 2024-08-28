import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from './entities';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  public constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.find({
      relations: { role: true },
    });
  }

  public async findById(id: string): Promise<UserEntity> {
    return await this.findOne({
      relations: { role: true },
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({
      relations: { role: true },
      where: { email },
    });
  }
}
