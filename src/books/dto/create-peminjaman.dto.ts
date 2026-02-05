import { IsInt, IsPositive } from 'class-validator';

export class CreatePeminjamanDto {
  @IsInt()
  @IsPositive()
  bookId: number;

  @IsInt()
  @IsPositive()
  qty: number;
}
