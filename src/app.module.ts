import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { ReturnsModule } from './returns/returns.module';
import { PrismaModule } from './prisma/prisma.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),

    PrismaModule,
    AuthModule,
    BooksModule,
    LoansModule,
    ReturnsModule,
    MembersModule,
  ],
})
export class AppModule {}
