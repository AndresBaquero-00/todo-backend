import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { Login } from '../interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<Login> {
    const user = await this.authService.login(email);
    if (user === undefined) {
      throw new UnauthorizedException('El usuario no está registrado.');
    }

    return user;
  }
}
