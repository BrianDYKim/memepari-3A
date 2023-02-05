import { JwtPayload } from './../../port/dto/request/jwt-payload.request.dto';
import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/users/port/service/ifs/users.service.ifs';
import { ReadUserResponse } from 'src/users/port/dto/response/read-user.response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('service') private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<ReadUserResponse> {
    return this.userService.findByJwtPayload(payload);
  }
}
