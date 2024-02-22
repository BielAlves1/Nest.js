import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService,) { }

    async login(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            username: user.username,
            name: user.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findUserName(username);

        if (user) {
            const passwordValid = await bcrypt.compare(password, user.password);

            if (passwordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        throw new Error('O username e/ou a senha fornecidos estão incorretos.');
    }
}