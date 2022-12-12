import { Category } from "@/category/entity";
import { serializeCollection } from "@/shared/serialization";
import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { Customization } from "./customization.entity";

@Entity()
export class Product {
  @Expose()
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Expose()
  @Property({ length: 100 })
  public name: string;

  @Expose()
  @Property({ length: 500 })
  public description: string;

  @Expose()
  @Property({ type: "decimal" })
  public fullPrice: number;

  @Expose()
  @Property({ type: "decimal" })
  public discountedPrice?: number;

  @Expose()
  @Property({ type: "mediumint" })
  public stock: number;

  @Expose()
  @Transform(params => {
    const value = params.value as Category;
    return value?.id;
  })
  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public category: Category;

  @Expose()
  @Transform(serializeCollection)
  @OneToMany(() => Customization, customization => customization.product, {
    orphanRemoval: true,
    eager: true,
  })
  public customizations = new Collection<Customization>(this);
}
