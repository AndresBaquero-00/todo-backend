import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity, UserEntity } from './entities';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UserService],
})
export class UserModule {}
