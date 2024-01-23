import { User } from '../entities/user.entity';
import {
    IsInt,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca',
    })
    password: string;

    @IsInt()
    companyId: number;
}