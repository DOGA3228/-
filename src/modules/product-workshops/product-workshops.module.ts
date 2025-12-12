import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductWorkshop } from '../../entities/product-workshop.entity';
import { ProductWorkshopsService } from './product-workshops.service';
import { ProductWorkshopsController } from './product-workshops.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductWorkshop])],
  controllers: [ProductWorkshopsController],
  providers: [ProductWorkshopsService],
  exports: [ProductWorkshopsService],
})
export class ProductWorkshopsModule {}
