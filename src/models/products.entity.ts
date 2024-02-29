import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index("IDX_products_category_id")
  @Column({ name: "category_id" })
  categoryId: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  price: number; 
 
  @Column()
  stock: number;

  @Index("IDX_products_created_at")
  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @OneToOne(() => Categories, { cascade: true })
  @JoinColumn({ name: 'categoryId' })
  category: Categories;

  constructor(entity: Partial<Products>) {
    Object.assign(this, entity);
  }
}
