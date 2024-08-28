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

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Payload } from 'src/auth/interfaces';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  public constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async findAll(@Req() req: Request) {
    console.log(req.user as Payload);
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
  @UseGuards(JwtAuthGuard)
  public async update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
