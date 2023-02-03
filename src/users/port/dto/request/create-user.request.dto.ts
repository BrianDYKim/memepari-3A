import { User } from 'src/users/domain/user.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUserRequest extends PickType(User, [
  'email',
  'password',
  'name',
  'address',
  'phoneNumber',
  'roles',
] as const) {}
