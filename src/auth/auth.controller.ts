import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LocalAuthGuard } from './guards';
import { Login } from './interfaces';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  public login(@Req() request: Request, @Res() response: Response) {
    const user: Login = request.user as Login;
    return response
      .status(HttpStatus.OK)
      .header('Authorization', `Bearer ${user.token}`)
      .send(user);
  }
}
