import { Buffet } from "@/buffet/entity/buffet.entity";
import { Product } from "@/product/entity";
import {
  Cascade,
  Collection,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Category {
  @PrimaryKey({ autoincrement: true })
  @Expose({ toPlainOnly: true })
  public id: number;

  @Property({ length: 80 })
  @Expose()
  public name: string;

  @Exclude()
  @OneToMany(() => Product, product => product.category, {
    cascade: [Cascade.PERSIST],
  })
  public products = new Collection<Product>(this);

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffet?: IdentifiedReference<Buffet>;
}
