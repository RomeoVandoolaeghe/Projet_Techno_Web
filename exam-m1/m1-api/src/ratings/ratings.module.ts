import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { DatabaseModule } from '../modules/database/database.module';  // Assure-toi que PrismaService est exporté depuis ce module

@Module({
  imports: [DatabaseModule],  // Importer DatabaseModule où PrismaService est exporté
  providers: [RatingsService],
})
export class RatingsModule {}
