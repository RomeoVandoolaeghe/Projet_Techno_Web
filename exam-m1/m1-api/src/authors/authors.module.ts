import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorsRepository } from './authors.repository';
import { PrismaService } from '../modules/database/prisma.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository, PrismaService],
})
export class AuthorsModule {}
