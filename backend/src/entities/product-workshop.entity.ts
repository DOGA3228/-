import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Workshop } from './workshop.entity';

@Entity('product_workshops')
export class ProductWorkshop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productionTime: number;

  @ManyToOne(() => Workshop, (workshop) => workshop.productWorkshops)
  @JoinColumn({ name: 'workshop_id' })
  workshop: Workshop;

  @Column()
  workshopId: number;

  @ManyToOne(() => Product, (product) => product.productWorkshops)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
