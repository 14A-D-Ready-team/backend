import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Property({ length: 80 })
  public name: string;

  @OneToMany(() => Product, product => product.category, {
    cascade: [Cascade.PERSIST],
  })
  public products = new Collection<Product>(this);
}
