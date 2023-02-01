import { Result } from './../../../common/results/results';
import { UserService } from '../../port/service/ifs/users.service.ifs';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { CreateUserRequest } from '../../port/dto/request/create-user.request.dto';
import { UpdateUserDto } from '../../port/dto/request/update-user.request.dto';
import { CreateUserResponse } from 'src/users/port/dto/response/create-user.response.dto';
import { ResultFactory } from 'src/common/results/results.factory';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    @Inject('serviceImpl') private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createRequest: CreateUserRequest) {
    const createdUser: CreateUserResponse = await this.userService.signUp(createRequest);

    return ResultFactory.getSuccessResult(createdUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
