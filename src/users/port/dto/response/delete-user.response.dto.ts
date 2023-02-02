import { User } from './../../../domain/user.entity';
import { PickType, ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponse extends PickType(User, ['email'] as const) {
  @ApiProperty({
    example: '123qwe',
    description: 'user의 식별자입니다',
  })
  id: string;

  constructor(id: string, email: string) {
    super();

    this.id = id;
    this.email = email;
  }

  static of(id: string, email: string) {
    return new DeleteUserResponse(id, email);
  }
}
