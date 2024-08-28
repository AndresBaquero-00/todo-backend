import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import type { ILogin, IPayload } from './interfaces';

@Injectable()
export class AuthService {
  public constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  public async login(email: string): Promise<ILogin | undefined> {
    const user = await this.userService.findByEmail(email);
    if (user === undefined) {
      return undefined;
    }

    const payload: IPayload = {
      id: user.id,
      name: user.firstName + ' ' + user.lastName,
      role: user.role.name,
    };

    const token = this.jwtService.sign(payload);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role.name,
      token: token,
    };
  }
}
