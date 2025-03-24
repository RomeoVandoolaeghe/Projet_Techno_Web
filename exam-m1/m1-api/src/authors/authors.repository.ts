import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class AuthorsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.author.create({ data });
  }

  findAll(filter: any) {
    return this.prisma.author.findMany(filter);
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
      include: { books: { include: { ratings: true } } },
    });
  }

  update(id: number, data: any) {
    return this.prisma.author.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
