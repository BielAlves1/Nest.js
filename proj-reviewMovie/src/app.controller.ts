import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Controller('app')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHello() : String {
    return this.prismaService.getHello();
  }
}
