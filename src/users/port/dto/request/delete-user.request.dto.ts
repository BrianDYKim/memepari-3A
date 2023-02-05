import { Role } from './../../../domain/vo/user-role.vo';
import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/domain/user.entity';

export class DeleteUserRequest extends PickType(User, [
  'email',
  'roles',
] as const) {
  @ApiProperty({
    example: '123qwe',
    description: 'user의 식별자입니다',
  })
  id: string;

  constructor(id: string, email: string, roles: Role[]) {
    super();

    this.id = id;
    this.email = email;
    this.roles = roles;
  }

  static of(id: string, email: string, roles: Role[]) {
    return new DeleteUserRequest(id, email, roles);
  }
}
