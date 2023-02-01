import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  password: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @Prop({ required: true })
  @IsNotEmpty()
  address: string;

  @Prop({ required: true, unique: true })
  @IsPhoneNumber('KR')
  @IsNotEmpty()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
