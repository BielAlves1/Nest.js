import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    const createdUser = await this.prisma.user.create({
      data:{
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 5),
      }
    });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByUserName(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const updatedUser = await this.prisma.user.update({
      where:{
        id
      },
      data:{
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 5),
      }
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
