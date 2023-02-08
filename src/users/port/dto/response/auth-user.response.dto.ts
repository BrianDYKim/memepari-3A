import { PickType, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/domain/user.entity';

export class AuthUserResponse extends PickType(User, ['email'] as const) {
  @ApiProperty({
    example: '123qwe',
    description: 'user의 식별자입니다',
  })
  id: string;

  private constructor(id: string, email: string) {
    super();

    this.id = id;
    this.email = email;
  }

  static of(id: string, email: string) {
    return new AuthUserResponse(id, email);
  }
}
