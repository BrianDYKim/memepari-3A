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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserRequest } from '../../port/dto/request/create-user.request.dto';
import { UpdateUserDto } from '../../port/dto/request/update-user.request.dto';
import { CreateUserResponse } from 'src/users/port/dto/response/create-user.response.dto';
import { ResultFactory } from 'src/common/results/results.factory';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    @Inject('service') private readonly userService: UserService,
  ) {}

  @ApiOperation({summary: '회원가입'})
  @ApiResponse({
    status: 200, 
    description: '회원가입 성공 응답입니다.', 
    type: CreateUserResponse
  })
  @ApiResponse({
    status: 403, 
    description: '중복된 이메일에 의한 오류입니다. 다른 이메일로 가입 요청을 전달해주세요.'
  })
  @ApiResponse({
    status: 400, 
    description: '잘못된 요청에 의한 오류입니다. 주로 요구사항에 맞지 않는 파라미터를 전달 시 해당 오류가 발생합니다.'
  })
  @Post()
  async create(@Body() createRequest: CreateUserRequest) {
    const createdUser: CreateUserResponse = await this.userService.signUp(
      createRequest,
    );

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
