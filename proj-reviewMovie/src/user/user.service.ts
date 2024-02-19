import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await bcrypt.hash(createUserDto.password, 10),
        }
      });

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      throw new HttpException('Erro ao criar usuário', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const user = await this.prisma.user.findMany();

      return {
        ...user,
        password: undefined,
      };
    }
    catch (error) {
      throw new HttpException('Erro ao listar usuários', HttpStatus.BAD_REQUEST);
    }
  }

  async findUserName(username: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username }
      });

      return {
        ...user,
        password: undefined,
      };
    }
    catch (error) {
      throw new HttpException('Erro: Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async findUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id }
      });

      return {
        ...user,
        password: undefined,
      };
    }
    catch (error) {
      throw new HttpException('Erro: Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userData: any = { ...updateUserDto };

      if (userData.password) {
        userData.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const user = await this.prisma.user.update({
        where: {
          id
        },
        data: userData
      });

      return user;
    }
    catch (error) {
      throw new HttpException('Erro ao alterar dados do usuário', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id }
      });

      return user;
    }
    catch (error) {
      throw new HttpException('Erro: Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }
  }
}
