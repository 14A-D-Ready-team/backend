import {
  Cascade,
  Collection,
  Entity,
  IdentifiedReference,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { Order } from "./order.entity";
import { Product } from "@/product/entity";
import { OrderedCustomization } from "./ordered-customization.entity";

export type RawOrderedProduct = Partial<OrderedProduct>;

@Entity()
export class OrderedProduct {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id: number;

  @Property()
  @Expose()
  public amount: number;

  @Expose()
  @Property({ length: 100 })
  public name: string;

  @Expose()
  @Property({ length: 500 })
  public description: string;

  @Expose()
  @Transform(({ value }) => +value)
  @Property({
    type: "decimal",
  })
  public fullPrice: string;

  @Expose()
  @Transform(({ value }) => (value ? +value : undefined))
  @Property({ type: "decimal" })
  public discountedPrice?: string;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public order!: IdentifiedReference<Order>;

  // Optional relation because the ordered product might have been deleted
  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public product?: IdentifiedReference<Product>;

  @OneToMany(
    () => OrderedCustomization,
    customization => customization.orderedProduct,
  )
  public customizations = new Collection<OrderedCustomization, OrderedProduct>(
    this,
  );

  constructor(data: RawOrderedProduct = {}) {}
}
