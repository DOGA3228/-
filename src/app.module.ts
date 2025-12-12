import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { MaterialsModule } from './modules/materials/materials.module';
import { ProductTypesModule } from './modules/product-types/product-types.module';
import { ProductWorkshopsModule } from './modules/product-workshops/product-workshops.module';
import { ProductsModule } from './modules/products/products.module';
import { WorkshopsModule } from './modules/workshops/workshops.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    ProductTypesModule,
    MaterialsModule,
    WorkshopsModule,
    ProductWorkshopsModule,
  ],
})
export class AppModule {}
