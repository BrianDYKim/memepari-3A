import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersServiceImpl } from './port/service/users.service';
import { UsersController } from './adapter/controller/users.controller';
import { User, UserSchema } from './domain/user.entity';
import { UserDao } from './adapter/dao/users.dao';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './adapter/jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'service',
      useClass: UsersServiceImpl,
    },
    {
      provide: 'repository',
      useClass: UserDao,
    },
    JwtStrategy
  ],
})
export class UsersModule {}
