import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    return material;
  }

  async update(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<Material> {
    const material = await this.findOne(id);
    Object.assign(material, updateMaterialDto);
    return this.materialRepository.save(material);
  }

  async remove(id: number): Promise<void> {
    const material = await this.findOne(id);
    await this.materialRepository.remove(material);
  }
}
