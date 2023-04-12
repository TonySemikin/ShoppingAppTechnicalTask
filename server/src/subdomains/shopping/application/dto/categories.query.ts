import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CategoriesQuery {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categoriesIds?: string[];
}
