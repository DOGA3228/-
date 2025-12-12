import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductWorkshop } from './product-workshop.entity';

@Entity('workshops')
export class Workshop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'int', default: 0 })
  numberWorkers: number;

  @OneToMany(() => ProductWorkshop, (pw) => pw.workshop, { cascade: true })
  productWorkshops: ProductWorkshop[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
