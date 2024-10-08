import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { ILogin } from '../interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<ILogin> {
    console.log('Validando existencia del usuario', username);
    const user = await this.authService.login(username);
    if (user === undefined) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
