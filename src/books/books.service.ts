import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany();
  }

  create(dto: CreateBookDto) {
return this.prisma.book.create({
  data: {
    title: "Bumi Manusia",
    author: "Pramoedya",
    year: 1980,
  }
});
  }
  update(id: number, dto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
