import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProductsQuery {
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  from: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  to: number;
}
