import { Role } from './../../../domain/vo/user-role.vo';
import { User } from './../../../domain/user.entity';
import { PickType, ApiProperty } from '@nestjs/swagger';

export class UpdateUserResponse extends PickType(User, [
  'email',
  'name',
  'address',
  'phoneNumber',
  'roles',
] as const) {
  @ApiProperty({
    example: '123qwe',
    description: 'user의 식별자입니다',
  })
  id: string;

  constructor(
    id: string,
    email: string,
    name: string,
    address: string,
    phoneNumber: string,
    roles: Role[],
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
  }

  static of(
    id: string,
    email: string,
    name: string,
    address: string,
    phoneNumber: string,
    roles: Role[],
  ): UpdateUserResponse {
    return new UpdateUserResponse(id, email, name, address, phoneNumber, roles);
  }

  static entityToResponse(user: User): UpdateUserResponse {
    const { id, email, name, address, phoneNumber, roles } = user;
    return this.of(id, email, name, address, phoneNumber, roles);
  }
}
