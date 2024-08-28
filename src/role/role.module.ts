import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from './entities';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  exports: [TypeOrmModule, RoleRepository],
  providers: [RoleRepository],
})
export class RoleModule {}
