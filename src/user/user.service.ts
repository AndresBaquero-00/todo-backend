import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async findUserByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });

    return user;
  }
}
