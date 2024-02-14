import { User } from '../entities/user.entity';
import { IsString, IsNumber } from 'class-validator';

export class DeleteUserDto extends User {
    @IsNumber()
    readonly id: number;
    
    @IsString()
    readonly name: string;

    @IsString({message: ''})
    readonly username: string;
}