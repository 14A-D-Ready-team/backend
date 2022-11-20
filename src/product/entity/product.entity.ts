import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Category } from "./category.entity";
import { Customization } from "./customization.entity";

@Entity()
export class Product {
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Property({ length: 100 })
  public name: string;

  @Property({ length: 500 })
  public description: string;

  @Property({ type: "decimal" })
  public fullPrice: number;

  @Property({ type: "decimal" })
  public discountedPrice: number;

  @Property({ type: "mediumint" })
  public stock: number;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public category: Category;

  @OneToMany(() => Customization, customization => customization.product, {
    orphanRemoval: true,
  })
  public customizations = new Collection<Customization>(this);
}
