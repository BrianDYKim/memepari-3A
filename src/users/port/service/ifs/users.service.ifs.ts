import { ReadUserResponse } from './../../dto/response/read-user.response.dto';
import { JwtPayload } from './../../dto/request/jwt-payload.request.dto';
import { LoginResponse } from './../../dto/response/login-token.response.dto';
import { LoginRequest } from './../../dto/request/login-user.request.dto';
import { CreateUserResponse } from './../../dto/response/create-user.response.dto';
import { CreateUserRequest } from '../../dto/request/create-user.request.dto';

export interface UserService {
  signUp(createRequest: CreateUserRequest): Promise<CreateUserResponse>;

  jwtLogin(loginRequest: LoginRequest): Promise<LoginResponse>;

  findByJwtPayload(jwtPayload: JwtPayload): Promise<ReadUserResponse>;
}
