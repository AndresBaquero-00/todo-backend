import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { Login } from '../interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<Login> {
    console.log('Validando existencia del usuario', username);
    const user = await this.authService.login(username);
    if (user === undefined) {
      throw new UnauthorizedException({
        message: 'El usuario no está registrado.',
      });
    }

    return user;
  }
}
