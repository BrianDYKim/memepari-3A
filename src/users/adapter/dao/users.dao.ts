import { CreateUserRequest } from './../../port/dto/request/create-user.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/domain/user.entity';
import { UserRepository } from '../../port/repository/users.repository';
import { UpdateUserRequest } from 'src/users/port/dto/request/update-user.request.dto';

@Injectable()
export class UserDao implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createRequest: CreateUserRequest): Promise<User> {
    return await this.userModel.create(createRequest);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result: boolean =
      (await this.userModel.findOne({ email })) !== null ? true : false;
    return result;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async deleteOneById(id: string): Promise<User | null> {
    const targetUser = await this.userModel.findById(id);

    return await targetUser.delete();
  }

  async updateUser(updateRequest: UpdateUserRequest): Promise<User> {
    const { id, password, address } = updateRequest;
    const foundUser = await this.userModel.findById(id);

    foundUser.password = password ? password : foundUser.password;
    foundUser.address = address ? address : foundUser.address;

    return await foundUser.save();
  }
}
