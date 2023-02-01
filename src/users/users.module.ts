import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersServiceImpl } from './port/service/users.service';
import { UsersController } from './adapter/controller/users.controller';
import { User, UserSchema } from './domain/user.entity';
import { UserDao } from './adapter/dao/users.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'serviceImpl',
      useClass: UsersServiceImpl,
    },
    {
      provide: 'repository', 
      useClass: UserDao
    }
  ],
})
export class UsersModule {}
