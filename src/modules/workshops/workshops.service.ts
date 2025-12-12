import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workshop } from '../../entities/workshop.entity';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private readonly workshopRepository: Repository<Workshop>,
  ) {}

  async create(createWorkshopDto: CreateWorkshopDto): Promise<Workshop> {
    const workshop = this.workshopRepository.create(createWorkshopDto);
    return this.workshopRepository.save(workshop);
  }

  async findAll(): Promise<Workshop[]> {
    return this.workshopRepository.find({
      relations: ['productWorkshops'],
    });
  }

  async findOne(id: number): Promise<Workshop> {
    const workshop = await this.workshopRepository.findOne({
      where: { id },
      relations: ['productWorkshops'],
    });

    if (!workshop) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return workshop;
  }

  async update(
    id: number,
    updateWorkshopDto: UpdateWorkshopDto,
  ): Promise<Workshop> {
    const workshop = await this.findOne(id);
    Object.assign(workshop, updateWorkshopDto);
    return this.workshopRepository.save(workshop);
  }

  async remove(id: number): Promise<void> {
    const workshop = await this.findOne(id);
    await this.workshopRepository.remove(workshop);
  }
}
