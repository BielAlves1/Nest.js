import { User } from '../entities/user.entity';
import { IsString, IsNumber } from 'class-validator';

export class DeleteUserDto extends User {
    @IsNumber()
    id: number;
    
    @IsString()
    name: string;

    @IsString({message: ''})
    username: string;
}