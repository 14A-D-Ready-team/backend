import { Cascade, Collection, Entity, IdentifiedReference, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { Order } from "./order.entity";
import { Option, Product } from "@/product";

@Entity()
export class OrderedProduct {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id: number;

  @Property()
  @Expose()
  public amount: number;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public order!: IdentifiedReference<Order>;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public product!: IdentifiedReference<Product>;

  @ManyToMany(() => Option, option => option.orderedProducts)
  public options = new Collection<Option>(this);

}