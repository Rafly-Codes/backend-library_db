import { IsArray, IsInt, IsDateString } from 'class-validator';

class LoanBookDto {
  @IsInt()
  bookId: number;

  @IsInt()
  qty: number;
}

export class CreateLoanDto {
  @IsInt()
  memberId: number;

  @IsDateString()
  dueDate: string;

  @IsArray()
  books: LoanBookDto[];
}
