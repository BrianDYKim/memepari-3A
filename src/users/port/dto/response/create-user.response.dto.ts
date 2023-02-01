import { PickType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/mapped-types';
import { User } from 'src/users/domain/user.entity';
export class CreateUserResponse extends PickType(User, [
  'email',
  'name',
  'address',
  'phoneNumber',
] as const) {
  private constructor(
    email: string,
    name: string,
    address: string,
    phoneNumber: string,
  ) {
    super();

    this.email = email;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  static of(email: string, name: string, address: string, phoneNumber: string) {
    return new CreateUserResponse(email, name, address, phoneNumber);
  }

  static entityToResponse(user: User): CreateUserResponse {
    const {email, name, address, phoneNumber} = user;
    return this.of(email, name, address, phoneNumber);
  }
}
