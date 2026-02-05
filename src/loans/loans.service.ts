import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLoanDto) {
    return this.prisma.$transaction(async (tx) => {
      // cek & kurangi stok
      for (const b of dto.books) {
        const book = await tx.book.findUnique({
          where: { id: b.bookId },
        });

        if (!book || book.stock < b.qty) {
          throw new Error('Stok buku tidak cukup');
        }

        await tx.book.update({
          where: { id: b.bookId },
          data: { stock: { decrement: b.qty } },
        });
      }

      // buat loan
      return tx.loan.create({
        data: {
          memberId: dto.memberId,
          dueDate: new Date(dto.dueDate),
          details: {
            create: dto.books.map((b) => ({
              bookId: b.bookId,
              qty: b.qty,
            })),
          },
        },
        include: {
          details: true,
        },
      });
    });
  }

  findAll() {
    return this.prisma.loan.findMany({
      include: {
        member: true,
        details: {
          include: {
            book: true,
          },
        },
      },
    });
  }
}
