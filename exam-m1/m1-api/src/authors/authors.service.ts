import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/database/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';


@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuthorDto) {
    return this.prisma.author.create({ data });
  }

  async findAll() {
    return this.prisma.author.findMany({ include: { books: true } });
  }

  async findOne(id: number) {
    return this.prisma.author.findUnique({ where: { id }, include: { books: true } });
  }

  async update(id: number, data: UpdateAuthorDto) {
    return this.prisma.author.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
