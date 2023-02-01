import { UserService } from './ifs/users.service.ifs';
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { CreateUserRequest } from '../../port/dto/request/create-user.request.dto';
import { UpdateUserDto } from '../../port/dto/request/update-user.request.dto';
import { CreateUserResponse } from '../dto/response/create-user.response.dto';
import { User } from 'src/users/domain/user.entity';
import { UserRepository } from '../users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersServiceImpl implements UserService {
  constructor(
    @Inject('repository') private readonly userRepository: UserRepository,
  ) {}

  async signUp(createRequest: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, name, address, phoneNumber } = createRequest;

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
    };

    const createdUser: User = await this.userRepository.createUser(
      hashedUser,
    );

    return CreateUserResponse.entityToResponse(createdUser);
  }

  findAll(): string {
    return `This action returns all users`;
  }

  findOne(id: number): string {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto): string {
    return `This action updates a #${id} user`;
  }

  remove(id: number): string {
    return `This action removes a #${id} user`;
  }
}
