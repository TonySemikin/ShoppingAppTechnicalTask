import { IsNotEmpty, IsString } from 'class-validator';

export class AdjustProductCategoryDto {
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
