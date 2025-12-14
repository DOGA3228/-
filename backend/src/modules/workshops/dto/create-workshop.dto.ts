import { IsString, IsInt, Min, MinLength } from 'class-validator';

export class CreateWorkshopDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  type: string;

  @IsInt()
  @Min(0)
  numberWorkers: number;
}
