import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';

@Controller('app')
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

  @IsPublic()
  @Get('hello')
  getHello(): String {
    return this.prismaService.getHello();
  }
  @Get('teste')
  getTeste(@CurrentUser() user: User) {
    return user;
  }
}
