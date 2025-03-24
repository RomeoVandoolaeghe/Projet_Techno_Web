import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller'; 
import { PrismaService } from '../modules/database/prisma.service';
import { RatingsRepository } from './ratings.repository'; 

@Module({
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository, PrismaService],
})
export class RatingsModule {}
