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
import { ILogin } from './interfaces';

@Controller('/auth')
export class AuthController {
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  public login(@Req() request: Request, @Res() response: Response) {
    const { token, ...user }: ILogin = request.user as ILogin;
    return response
      .status(HttpStatus.OK)
      .header('Authorization', `Bearer ${token}`)
      .send({
        user,
        token,
      });
  }
}
