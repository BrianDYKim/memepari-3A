import { UpdateUserRequest } from 'src/users/port/dto/request/update-user.request.dto';
import { DeleteUserRequest } from './../../../port/dto/request/delete-user.request.dto';
import { ReadUserResponse } from 'src/users/port/dto/response/read-user.response.dto';
import { Role } from './../../../domain/vo/user-role.vo';
import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class UserRoleExistsPipe implements PipeTransform {
  private readonly authorizedRoles: Role[] = ['User', 'Admin'];

  transform(value: ReadUserResponse | DeleteUserRequest | UpdateUserRequest) {
    const { roles } = value;

    const authResult = this.authorizedRoles
      .map((role) => roles.includes(role))
      .includes(true);

    if (!authResult) {
      throw new HttpException('올바르지 않은 접근입니다.', 403);
    }

    return value;
  }
}
