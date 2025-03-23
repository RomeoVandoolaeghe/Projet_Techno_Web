import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { DatabaseModule } from '../modules/database/database.module';  // Assure-toi que PrismaService est exporté depuis ce module

@Module({
  imports: [DatabaseModule],  // Importer DatabaseModule où PrismaService est exporté
  providers: [BooksService],
})
export class BooksModule {}
