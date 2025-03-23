import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/database/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; publishedYear: number; price: number; authorId: number }): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany({ include: { ratings: true } });
  }

  async findOne(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id }, include: { ratings: true } });
  }

  async update(id: number, data: Partial<Book>): Promise<Book> {
    return this.prisma.book.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Book> {
    return this.prisma.book.delete({ where: { id } });
  }
}