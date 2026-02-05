import { IsString, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(0)
  stock: number;
}
