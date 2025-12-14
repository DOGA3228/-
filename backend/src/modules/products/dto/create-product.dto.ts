import { IsString, IsNumber, IsInt, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  article: string;

  @IsNumber()
  @Min(0)
  minimumCost: number;

  @IsInt()
  @Min(1)
  typeId: number;

  @IsInt()
  @Min(1)
  materialId: number;
}
