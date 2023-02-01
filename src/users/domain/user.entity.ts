import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: '18k7102dy@gmail.com',
    description: '이메일 (중복 허용 x)',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'qwesfdfkjhqwe123!', 
    description: '비밀번호', 
    required: true
  })
  @Prop({ required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '김도엽', 
    description: '이름 (중복 허용 x, 최소 길이 2, 최대 길이 20)', 
    required: true
  })
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: '경상북도 포항시 북구', 
    description: '주소', 
    required: true
  })
  @Prop({ required: true })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '010-1111-2222', 
    description: '휴대폰 번호 (중복 허용 x, 한국 기준 휴대폰 번호만 허용)', 
    required: true
  })
  @Prop({ required: true, unique: true })
  @IsPhoneNumber('KR')
  @IsNotEmpty()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
