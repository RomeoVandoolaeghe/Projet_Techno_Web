import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.book.create({ data });
  }

  findAll(filter: any) {
    return this.prisma.book.findMany(filter);
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      include: { ratings: true, author: true },
    });
  }

  update(id: number, data: any) {
    return this.prisma.book.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }

  findRatingsByBook(bookId: number) {
    return this.prisma.rating.findMany({
      where: { bookId },
    });
  }
}
