// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Material } from '../entities/material.entity';
import { ProductType } from '../entities/product-type.entity';
import { ProductWorkshop } from '../entities/product-workshop.entity';
import { Product } from '../entities/product.entity';
import { Workshop } from '../entities/workshop.entity';

// Безопасно получаем env: если process по какой‑то причине undefined – используем пустой объект
const env = typeof process !== 'undefined' ? (process.env ?? {}) : {};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DATABASE_HOST || 'localhost',
  port: parseInt(env.DATABASE_PORT || '5432', 10),
  username: env.DATABASE_USERNAME || 'postgres',
  password: env.DATABASE_PASSWORD || 'postgres',
  database: env.DATABASE_NAME || 'praktika',
  entities: [Product, ProductType, Material, Workshop, ProductWorkshop],
  synchronize: env.NODE_ENV === 'development',
  logging: env.NODE_ENV === 'development',
  dropSchema: false,
};
