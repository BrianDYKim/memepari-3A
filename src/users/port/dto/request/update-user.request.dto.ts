import { Role } from './../../../domain/vo/user-role.vo';
import { User } from 'src/users/domain/user.entity';
import { PickType, PartialType, ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequest {
  @ApiProperty({
    example: null,
    description: 'user의 식별자입니다',
    required: false,
  })
  id?: string;

  @ApiProperty({
    example: 'qwesfdfkjhqwe123!',
    description: '비밀번호',
    required: false,
  })
  password?: string;

  @ApiProperty({
    example: '경상북도 포항시 북구',
    description: '주소',
    required: false,
  })
  address?: string;

  roles: Role[];

  constructor(id: string, roles: Role[], password?: string, address?: string) {
    this.id = id;
    this.roles = roles;
    this.password = password;
    this.address = address;
  }

  static of(
    id: string,
    roles: Role[],
    password?: string,
    address?: string,
  ): UpdateUserRequest {
    return new UpdateUserRequest(id, roles, password, address);
  }
}
