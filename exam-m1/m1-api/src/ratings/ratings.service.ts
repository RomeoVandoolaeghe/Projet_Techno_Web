import { Injectable } from '@nestjs/common';
import { Rating } from '@prisma/client';
import { RatingsRepository } from './ratings.repository';

@Injectable()
export class RatingsService {
  constructor(private ratingsRepo: RatingsRepository) {}

  async create(data: {
    bookId: number;
    stars: number;
    comment?: string;
  }): Promise<Rating> {
    return this.ratingsRepo.create(data);
  }

  async findAll(bookId?: number, sort?: 'asc' | 'desc'): Promise<Rating[]> {
    const filter: any = {
      where: bookId ? { bookId } : {},
      include: { book: true },
    };
    if (sort) {
      filter.orderBy = { createdAt: sort };
    }
    return this.ratingsRepo.findAll(filter);
  }

  async findOne(id: number): Promise<Rating | null> {
    return this.ratingsRepo.findOne(id);
  }

  async update(id: number, data: Partial<Rating>): Promise<Rating> {
    return this.ratingsRepo.update(id, data);
  }

  async remove(id: number): Promise<Rating> {
    return this.ratingsRepo.delete(id);
  }
}
