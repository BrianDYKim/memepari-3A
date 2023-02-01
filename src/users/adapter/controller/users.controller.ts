import { LoginResponse } from './../../port/dto/response/login-token.response.dto';
import { LoginRequest } from './../../port/dto/request/login-user.request.dto';
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
  @Post('/user/register')
  async create(@Body() createRequest: CreateUserRequest) {
    const createdUser: CreateUserResponse = await this.userService.signUp(
      createRequest,
    );

    return ResultFactory.getSuccessResult(createdUser);
  }

  @ApiOperation({summary: 'jwt 로그인'})
  @ApiResponse({
    status: 200, 
    description: '로그인 성공 응답입니다.', 
    type: LoginResponse
  })
  @ApiResponse({
    status: 401, 
    description: '잘못된 이메일 또는 비밀번호로 인한 오류입니다. 다시 확인해주세요.'
  })
  @ApiResponse({
    status: 400, 
    description: '잘못된 요청에 의한 오류입니다. 주로 요구사항에 맞지 않는 파라미터를 전달 시 해당 오류가 발생합니다.'
  })
  @Post('/user/login')
  async jwtLogin(@Body() loginRequest: LoginRequest) {
    const loginResponse: LoginResponse = await this.userService.jwtLogin(loginRequest);

    return ResultFactory.getSuccessResult(loginResponse);
  }
}
