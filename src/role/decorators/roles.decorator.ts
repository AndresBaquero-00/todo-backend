import { Reflector } from '@nestjs/core';

import { RoleEnum } from '../enums';

export const HasRoleDecorator = Reflector.createDecorator<RoleEnum[]>();
