import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from '../../entities/product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}

  async create(
    createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductType> {
    const productType = this.productTypeRepository.create(createProductTypeDto);
    return this.productTypeRepository.save(productType);
  }

  async findAll(): Promise<ProductType[]> {
    return this.productTypeRepository.find();
  }

  async findOne(id: number): Promise<ProductType> {
    const productType = await this.productTypeRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!productType) {
      throw new NotFoundException(`ProductType with ID ${id} not found`);
    }

    return productType;
  }

  async update(
    id: number,
    updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<ProductType> {
    const productType = await this.findOne(id);
    Object.assign(productType, updateProductTypeDto);
    return this.productTypeRepository.save(productType);
  }

  async remove(id: number): Promise<void> {
    const productType = await this.findOne(id);
    await this.productTypeRepository.remove(productType);
  }
}
