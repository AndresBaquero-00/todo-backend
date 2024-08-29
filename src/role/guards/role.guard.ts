import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IPayload } from 'src/auth/interfaces';
import { HasRoleDecorator } from '../decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(HasRoleDecorator, context.getHandler());
    if (roles === undefined) {
      return true;
    }

    const user: IPayload = context.switchToHttp().getRequest().user;
    return roles.some((role) => role === user.role);
  }
}
