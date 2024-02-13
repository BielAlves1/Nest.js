import { User } from '../entities/user.entity';
import {
    IsString,
    Length,
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
    //@MinLength(4)
    //@MaxLength(20)
    @Length(4, 20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca',
    })
    password: string;

    @IsString()
    avatarUrl: string;
}