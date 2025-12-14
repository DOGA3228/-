import { PartialType } from '@nestjs/mapped-types';
import { CreateProductWorkshopDto } from './create-product-workshop.dto';

export class UpdateProductWorkshopDto extends PartialType(
  CreateProductWorkshopDto,
) {}
