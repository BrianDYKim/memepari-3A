import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/domain/user.entity';

export class LoginRequest extends PickType(User, [
  'email',
  'password',
] as const) {}
