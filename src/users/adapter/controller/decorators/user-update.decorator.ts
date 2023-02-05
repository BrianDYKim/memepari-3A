import { UpdateUserRequest } from 'src/users/port/dto/request/update-user.request.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UpdateUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { password, address } = request.body;
    const { id, roles } = request.user;

    return UpdateUserRequest.of(id, roles, password, address);
  },
);
