import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RoleEntity } from './entities';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  public constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  public async findById(id: number): Promise<RoleEntity> {
    return await this.findOne({
      where: { id },
    });
  }
}
