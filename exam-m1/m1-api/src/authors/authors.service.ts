import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';
import { AuthorsRepository } from './authors.repository';

@Injectable()
export class AuthorsService {
  constructor(private authorsRepo: AuthorsRepository) {}

  async create(data: any): Promise<Author> {
    return this.authorsRepo.create(data);
  }

  async findAll(): Promise<Author[]> {
    return this.authorsRepo.findAll({ include: { books: true } });
  }

  async findOne(id: number): Promise<Author | null> {
    return this.authorsRepo.findOne(id);
  }

  async update(id: number, data: Partial<Author>): Promise<Author> {
    return this.authorsRepo.update(id, data);
  }

  async remove(id: number): Promise<Author> {
    return this.authorsRepo.delete(id);
  }
}
