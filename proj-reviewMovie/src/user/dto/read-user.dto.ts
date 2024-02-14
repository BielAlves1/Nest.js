import { User } from '../entities/user.entity';
import { IsString, IsNumber } from 'class-validator';

export class ReadUserDto extends User {
    @IsNumber()
    readonly id: number;
    
    @IsString()
    readonly name: string;

    @IsString()
    readonly username: string;

    @IsString()
    readonly avatarUrl: string;
}