import { Controller, Get, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('read-username/:username')
  findUserName(@Param('username') username: string) {
    return this.userService.findUserName(username);
  }

  @Get('read-user/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(+id);
  }

  @Patch('update-user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete-user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
