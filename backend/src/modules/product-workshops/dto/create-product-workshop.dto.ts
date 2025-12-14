import { IsString, IsNumber, IsInt, Min, MinLength } from 'class-validator';

export class CreateProductWorkshopDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @Min(0)
  productionTime: number;

  @IsInt()
  @Min(1)
  workshopId: number;

  @IsInt()
  @Min(1)
  productId: number;
}
