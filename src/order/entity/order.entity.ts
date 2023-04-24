import { Customer } from "@/user/entity";
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
import { Expose } from "class-transformer";
import { OrderStatus } from "./order-status.entity";
import { Buffet } from "@/buffet/entity";
import { OrderedProduct } from "./ordered-product.entity";

export type RawOrder = Partial<Order>;
@Entity()
export class Order {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id!: number;

  // ! Calculated by SQL
  @Property()
  @Expose()
  public total!: number;

  @Property()
  @Expose()
  public orderNumber!: number;

  @Property()
  @Expose()
  public date!: Date;

  @Property()
  @Expose()
  public pickupTime!: Date;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public customer!: IdentifiedReference<Customer>;

  @OneToMany(() => OrderStatus, orderStatus => orderStatus.order, {
    orphanRemoval: true,
  })
  public statusHistory = new Collection<OrderStatus>(this);

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public buffet!: IdentifiedReference<Buffet>;

  @OneToMany(() => OrderedProduct, orderedProduct => orderedProduct.order, {
    orphanRemoval: true,
  })
  public products? = new Collection<OrderedProduct>(this);

  constructor(data: RawOrder = {}) {
    Object.assign(this, data);
  }
}
