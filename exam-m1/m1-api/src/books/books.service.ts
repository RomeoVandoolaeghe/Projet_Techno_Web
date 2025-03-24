import { Injectable, BadRequestException } from '@nestjs/common';
import { Book } from '@prisma/client';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepo: BooksRepository) {}

  async create(data: {
    title: string;
    publishedYear: number;
    price: number;
    authorId: number;
  }): Promise<Book> {
    try {
      return await this.booksRepo.create(data);
    } catch (error) {
      if (
        error.code === 'P2003' ||
        error.message.includes('Foreign key constraint failed')
      ) {
        throw new BadRequestException(
          'Auteur introuvable. Vérifie le authorId.',
        );
      }
      throw error;
    }
  }

  async findAll(search?: string, sort?: 'asc' | 'desc'): Promise<Book[]> {
    const filter: any = {
      where: search ? { title: { contains: search.toLowerCase() } } : {},
      include: { ratings: true, author: true },
    };
    if (sort) filter.orderBy = { title: sort };
    return this.booksRepo.findAll(filter);
  }

  async findOne(id: number): Promise<Book | null> {
    return this.booksRepo.findOne(id);
  }

  async getAverageRating(id: number): Promise<number> {
    const ratings = await this.booksRepo.findRatingsByBook(id);
    if (ratings.length === 0) return 0;
    return ratings.reduce((acc, r) => acc + r.stars, 0) / ratings.length;
  }

  async update(id: number, data: Partial<Book>): Promise<Book> {
    return this.booksRepo.update(id, data);
  }

  async remove(id: number): Promise<Book> {
    return this.booksRepo.delete(id);
  }
}
