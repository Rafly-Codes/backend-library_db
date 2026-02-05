import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoanStatus } from '@prisma/client';

@Injectable()
export class ReturnsService {
  constructor(private prisma: PrismaService) {}

  async processReturn(loanId: number) {
    return this.prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findUnique({
        where: { id: loanId },
        include: {
          details: true,
        },
      });

      if (!loan) {
        throw new BadRequestException('Loan tidak ditemukan');
      }

      if (loan.status === LoanStatus.RETURNED) {
        throw new BadRequestException('Loan sudah dikembalikan');
      }

      // balikin stok buku
      for (const d of loan.details) {
        await tx.book.update({
          where: { id: d.bookId },
          data: {
            stock: { increment: d.qty },
          },
        });
      }

      // update loan
      await tx.loan.update({
        where: { id: loanId },
        data: {
          status: LoanStatus.RETURNED,
          returnDate: new Date(),
        },
      });

      // catat return
      tx.bookReturn.create({
  data: {
    loanId,
    returnDate: new Date(),
        },
  });
      return { message: 'Buku berhasil dikembalikan' };
    });
  }
}