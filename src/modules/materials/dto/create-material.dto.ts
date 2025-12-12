import { IsString, IsNumber, Min, MinLength } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @Min(0)
  missingPercent: number;
}
