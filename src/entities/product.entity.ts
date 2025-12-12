import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Material } from './material.entity';
import { ProductType } from './product-type.entity';
import { ProductWorkshop } from './product-workshop.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  article: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  minimumCost: number;

  @ManyToOne(() => ProductType, (type) => type.products)
  @JoinColumn({ name: 'type_id' })
  type: ProductType;

  @Column()
  typeId: number;

  @ManyToOne(() => Material, (material) => material.products)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @Column()
  materialId: number;

  @OneToMany(() => ProductWorkshop, (pw) => pw.product, { cascade: true })
  productWorkshops: ProductWorkshop[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
