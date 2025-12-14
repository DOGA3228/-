import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductWorkshopsService } from './product-workshops.service';
import { CreateProductWorkshopDto } from './dto/create-product-workshop.dto';
import { UpdateProductWorkshopDto } from './dto/update-product-workshop.dto';

@Controller('api/product-workshops')
export class ProductWorkshopsController {
  constructor(
    private readonly productWorkshopsService: ProductWorkshopsService,
  ) {}

  @Post()
  create(@Body() createProductWorkshopDto: CreateProductWorkshopDto) {
    return this.productWorkshopsService.create(createProductWorkshopDto);
  }

  @Get()
  findAll() {
    return this.productWorkshopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productWorkshopsService.findOne(id);
  }

  @Get('product/:productId')
  findByProductId(@Param('productId', ParseIntPipe) productId: number) {
    return this.productWorkshopsService.findByProductId(productId);
  }

  @Get('product/:productId/total-time')
  calculateTotalProductionTime(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productWorkshopsService.calculateTotalProductionTime(productId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductWorkshopDto: UpdateProductWorkshopDto,
  ) {
    return this.productWorkshopsService.update(id, updateProductWorkshopDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productWorkshopsService.remove(id);
  }
}
