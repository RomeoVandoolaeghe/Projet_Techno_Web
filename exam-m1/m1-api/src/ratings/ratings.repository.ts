import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/prisma.service';

@Injectable()
export class RatingsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.rating.create({ data });
  }

  findAll(filter: any) {
    return this.prisma.rating.findMany(filter);
  }

  findOne(id: number) {
    return this.prisma.rating.findUnique({
      where: { id },
      include: { book: true },
    });
  }

  update(id: number, data: any) {
    return this.prisma.rating.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.rating.delete({ where: { id } });
  }
}
