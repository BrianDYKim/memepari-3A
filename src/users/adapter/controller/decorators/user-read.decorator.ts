import { ReadUserResponse } from 'src/users/port/dto/response/read-user.response.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReadUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as ReadUserResponse;
  },
);
