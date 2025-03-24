import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { PrismaService } from '../modules/database/prisma.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService, BooksRepository],
})
export class BooksModule {}
