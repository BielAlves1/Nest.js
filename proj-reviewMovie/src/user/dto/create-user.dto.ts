import { Transform } from 'class-transformer';
import { IsString, Length, Matches, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres.' })
  @MaxLength(20, {
    message: 'Nome de usuário deve ter no máximo 20 caracteres.',
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username deve conter apenas letras, números e sublinhados.',
  })
  @Transform(({ value }) => `@${value.replace(/^@/, '')}`)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca!',
  })
  password: string;

  @IsString()
  avatarUrl: string;
}
