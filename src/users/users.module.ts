import { Module } from '@nestjs/common';
import { UsersServiceImpl } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [{
    provide: 'serviceImpl', useClass: UsersServiceImpl
  }],
})
export class UsersModule {}
