import { User } from 'src/users/domain/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserRequest extends PickType(User, [
  'email',
  'password',
  'name',
  'address',
  'phoneNumber',
] as const) {}
