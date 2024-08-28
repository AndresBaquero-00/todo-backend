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
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';

@Controller('/user')
export class UserController {
  public constructor(private userService: UserService) {}

  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  public async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
