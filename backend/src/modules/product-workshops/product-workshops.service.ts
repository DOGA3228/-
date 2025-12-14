import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductWorkshop } from '../../entities/product-workshop.entity';
import { CreateProductWorkshopDto } from './dto/create-product-workshop.dto';
import { UpdateProductWorkshopDto } from './dto/update-product-workshop.dto';

@Injectable()
export class ProductWorkshopsService {
  constructor(
    @InjectRepository(ProductWorkshop)
    private readonly productWorkshopRepository: Repository<ProductWorkshop>,
  ) {}

  async create(
    createProductWorkshopDto: CreateProductWorkshopDto,
  ): Promise<ProductWorkshop> {
    const productWorkshop = this.productWorkshopRepository.create(
      createProductWorkshopDto,
    );
    return this.productWorkshopRepository.save(productWorkshop);
  }

  async findAll(): Promise<ProductWorkshop[]> {
    return this.productWorkshopRepository.find({
      relations: ['product', 'workshop'],
    });
  }

  async findOne(id: number): Promise<ProductWorkshop> {
    const productWorkshop = await this.productWorkshopRepository.findOne({
      where: { id },
      relations: ['product', 'workshop'],
    });

    if (!productWorkshop) {
      throw new NotFoundException(`ProductWorkshop with ID ${id} not found`);
    }

    return productWorkshop;
  }

  async findByProductId(productId: number): Promise<ProductWorkshop[]> {
    return this.productWorkshopRepository.find({
      where: { productId },
      relations: ['workshop'],
    });
  }

  async update(
    id: number,
    updateProductWorkshopDto: UpdateProductWorkshopDto,
  ): Promise<ProductWorkshop> {
    const productWorkshop = await this.findOne(id);
    Object.assign(productWorkshop, updateProductWorkshopDto);
    return this.productWorkshopRepository.save(productWorkshop);
  }

  async remove(id: number): Promise<void> {
    const productWorkshop = await this.findOne(id);
    await this.productWorkshopRepository.remove(productWorkshop);
  }

  // Расчет общего времени производства продукта
  async calculateTotalProductionTime(productId: number): Promise<number> {
    const productWorkshops = await this.findByProductId(productId);
    return productWorkshops.reduce(
      (total, pw) => total + parseFloat(pw.productionTime.toString()),
      0,
    );
  }
}
