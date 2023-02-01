import { User } from 'src/users/domain/user.entity';
import { PickType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRequest } from './create-user.request.dto';

export class UpdateUserDto extends PickType(User, [
  'name',
  'address',
  'phoneNumber',
] as const) {}
