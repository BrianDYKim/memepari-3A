import { DeleteUserRequest } from './../../../port/dto/request/delete-user.request.dto';
import { ReadUserResponse } from 'src/users/port/dto/response/read-user.response.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const DeleteUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { id, email } = request.user;

    return DeleteUserRequest.of(id, email);
  },
);
