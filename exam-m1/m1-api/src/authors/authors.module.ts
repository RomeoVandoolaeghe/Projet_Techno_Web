import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorsRepository } from './authors.repository'; // Importer le repository
import { PrismaService } from '../modules/database/prisma.service'; // Importer PrismaService

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository, PrismaService],
})
export class AuthorsModule {}
