import { UpdateUserRequest } from './../dto/request/update-user.request.dto';
import { CreateUserRequest } from '../dto/request/create-user.request.dto';
import { User } from '../../domain/user.entity';

export interface UserRepository {
  createUser(createRequest: CreateUserRequest): Promise<User>;

  existsByEmail(email: string): Promise<boolean>;

  findOneByEmail(email: string): Promise<User | null>;

  findOneById(id: string): Promise<User | null>;

  deleteOneById(id: string): Promise<boolean>;

  updateUser(updateRequest: UpdateUserRequest): Promise<User>;
}
