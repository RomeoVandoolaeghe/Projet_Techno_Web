import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/database/prisma.service';
import { Rating } from '@prisma/client';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { bookId: number; score: number; comment?: string }): Promise<Rating> {
    return this.prisma.rating.create({
      data: {
        book: { connect: { id: data.bookId } },
        stars: data.score,
        comment: data.comment,
      },
    });
  }

  async findAll(): Promise<Rating[]> {
    return this.prisma.rating.findMany({ include: { book: true } });
  }

  async findOne(id: number): Promise<Rating | null> {
    return this.prisma.rating.findUnique({ where: { id }, include: { book: true } });
  }

  async update(id: number, data: Partial<Rating>): Promise<Rating> {
    return this.prisma.rating.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Rating> {
    return this.prisma.rating.delete({ where: { id } });
  }
}
