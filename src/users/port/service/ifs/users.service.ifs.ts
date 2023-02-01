import { CreateUserResponse } from './../../dto/response/create-user.response.dto';
import { UpdateUserDto } from '../../dto/request/update-user.request.dto';
import { CreateUserRequest } from '../../dto/request/create-user.request.dto';
export interface UserService {
  signUp(createRequest: CreateUserRequest): Promise<CreateUserResponse>;

  findAll(): string;

  findOne(id: number): string;

  update(id: number, updateUserDto: UpdateUserDto): string;

  remove(id: number): string;
}
