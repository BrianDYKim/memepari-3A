import { DeleteUserRequest } from './../dto/request/delete-user.request.dto';
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { LoginResponse } from './../dto/response/login-token.response.dto';
import { LoginRequest } from './../dto/request/login-user.request.dto';
import { UserService } from './ifs/users.service.ifs';
import { CreateUserRequest } from '../../port/dto/request/create-user.request.dto';
import { CreateUserResponse } from '../dto/response/create-user.response.dto';
import { User } from 'src/users/domain/user.entity';
import { UserRepository } from '../repository/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../dto/request/jwt-payload.request.dto';
import { ReadUserResponse } from '../dto/response/read-user.response.dto';
import { DeleteUserResponse } from '../dto/response/delete-user.response.dto';
import { UpdateUserRequest } from '../dto/request/update-user.request.dto';
import { UpdateUserResponse } from '../dto/response/update-user.response.dto';

@Injectable()
export class UsersServiceImpl implements UserService {
  constructor(
    @Inject('repository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createRequest: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, name, address, phoneNumber, roles } =
      createRequest;

    const isAlreadyExistsEmail = await this.userRepository.existsByEmail(email);

    if (isAlreadyExistsEmail) {
      throw new HttpException('이미 존재하는 계정입니다.', 403);
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const hashedUser: CreateUserRequest = {
      email,
      password: hashedPassword,
      name,
      address,
      phoneNumber,
      roles,
    };

    const createdUser: User = await this.userRepository.createUser(hashedUser);

    return CreateUserResponse.entityToResponse(createdUser);
  }

  async jwtLogin(loginRequest: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginRequest;

    const foundUser: User | null = await this.userRepository.findOneByEmail(
      email,
    );

    if (!foundUser) {
      throw new HttpException(
        '이메일 또는 비밀번호를 다시 확인해주십시오.',
        401,
      );
    }

    const isPasswordValidate: boolean = await bcrypt.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordValidate) {
      throw new HttpException(
        '이메일 또는 비밀번호를 다시 확인해주십시오.',
        401,
      );
    }

    const jwtPayload = {
      id: foundUser.id,
      email: foundUser.email,
      roles: foundUser.roles,
    };

    return LoginResponse.of(this.jwtService.sign(jwtPayload));
  }

  async findByJwtPayload(jwtPayload: JwtPayload): Promise<ReadUserResponse> {
    const foundUser: User | null = await this.userRepository.findOneById(
      jwtPayload.id,
    );

    if (!foundUser) {
      throw new HttpException('권한이 없습니다', 401);
    }

    return ReadUserResponse.entityToResponse(foundUser);
  }

  async deleteUser(
    deleteRequest: DeleteUserRequest,
  ): Promise<DeleteUserResponse> {
    const { id, email } = deleteRequest;
    const deleteResult: boolean = await this.userRepository.deleteOneById(id);

    if (!deleteResult) {
      throw new HttpException('사용자 삭제가 실패하였습니다', 500);
    }

    return DeleteUserResponse.of(id, email);
  }

  async updateUser(
    updateRequest: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const { id, password, address, roles } = updateRequest;

    const hashedPassword: string | null = password
      ? await bcrypt.hash(updateRequest.password, 10)
      : null;

    const hashedUserRequest: UpdateUserRequest = UpdateUserRequest.of(
      id,
      roles,
      hashedPassword,
      address,
    );

    const updatedUser: User = await this.userRepository.updateUser(
      hashedUserRequest,
    );

    return UpdateUserResponse.entityToResponse(updatedUser);
  }
}
