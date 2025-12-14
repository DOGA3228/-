import { IsString, IsNumber, Min, MinLength } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @Min(0)
  coefficient: number;
}
