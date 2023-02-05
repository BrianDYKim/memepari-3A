import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example: 'qweoiuhjnq231',
    description: '성공적으로 발급된 jwt 토큰 값입니다.',
  })
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  static of(token: string) {
    return new LoginResponse(token);
  }
}
