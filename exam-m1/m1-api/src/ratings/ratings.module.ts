import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller'; // Importe RatingsController
import { PrismaService } from '../modules/database/prisma.service';
import { RatingsRepository } from './ratings.repository'; // Importe RatingsRepository

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository, PrismaService],
})
export class RatingsModule {}
