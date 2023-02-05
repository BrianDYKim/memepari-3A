import { UpdateUserRequest } from 'src/users/port/dto/request/update-user.request.dto';
import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class UpdatePropertyExclusivelyExistsPipe implements PipeTransform {
  transform(updateUserRequest: UpdateUserRequest) {
    const { password, address } = updateUserRequest;

    if (!password && !address) {
        throw new HttpException('password, address 중 하나는 무조건 존재해야합니다', 400);
    }

    return updateUserRequest;
  }
}
