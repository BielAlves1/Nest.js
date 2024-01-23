import { Body, Controller, Get } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateMemberRocketBody } from './dtos/create-member-rocket-body';

@Controller('app')
export class AppController {
  
  constructor(
    private prisma: PrismaService,
  ) {}

  @Get('hello')
  async getHello(@Body() body: CreateMemberRocketBody) {
    const { name, function: memberFunction } = body;

    const member = await this.prisma.memberRocket.create({
      data: {
        id: randomUUID(),
        name,
        function: memberFunction,
      },
    });

    return {
      member,
    };
  }
}
