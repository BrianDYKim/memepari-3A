import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export interface UserService {
    create(createUserDto: CreateUserDto): string;

    findAll(): string;

    findOne(id: number): string;

    update(id: number, updateUserDto: UpdateUserDto): string;

    remove(id: number): string;
}