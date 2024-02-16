import { Injectable, Query } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {

    const user = await this.prisma.user.create({
      data:{
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      }
    });

    return {
      ...user,
      password: undefined,
    };
  }
  
  async findAll() {
    const user = await this.prisma.user.findMany();

    return {
      ...user,
      password: undefined,
    };
  }

  async findUserName(username: string){
    const user = await this.prisma.user.findUnique({ 
      where: { username }
    });

    return user;
  }

  async findUser(id: number){
    const user = await this.prisma.user.findUnique({ 
      where: { id } 
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const user = await this.prisma.user.update({
      where:{
        id
      },
      data:{
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      }
    });

    return user;
  }

  async remove(id: number){
    const user = await this.prisma.user.delete({ 
      where: { id } 
    });
    
    return user;
  }
}
