import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards';
import { IPayload } from 'src/auth/interfaces';
import { HasRoleDecorator } from 'src/role/decorators';
import { RoleEnum } from 'src/role/enums';
import { RoleGuard } from 'src/role/guards';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  public constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HasRoleDecorator([RoleEnum.Administrador])
  public async findAll(@Req() req: Request) {
    console.log(req.user as IPayload);
    return this.userService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  public async update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  public async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
