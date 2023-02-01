import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/domain/user.entity';
export class CreateUserResponse extends PickType(User, [
  'email',
  'name',
  'address',
  'phoneNumber',
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
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  static of(
    id: string,
    email: string,
    name: string,
    address: string,
    phoneNumber: string,
  ) {
    return new CreateUserResponse(id, email, name, address, phoneNumber);
  }

  static entityToResponse(user: User): CreateUserResponse {
    const { id, email, name, address, phoneNumber } = user;
    return this.of(id, email, name, address, phoneNumber);
  }
}
