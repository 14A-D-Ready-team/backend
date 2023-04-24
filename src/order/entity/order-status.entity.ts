import {
  Cascade,
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { OrderStatusEnum } from "../enum/order-status.enum";
import { Order } from "./order.entity";

@Entity()
export class OrderStatus {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id!: number;

  @Enum()
  @Expose()
  public status!: OrderStatusEnum;

  @Property()
  @Expose()
  public date!: Date;

  @Property({ length: 255 })
  @Expose()
  public message?: string;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
    eager: true,
  })
  public order!: IdentifiedReference<Order>;

  constructor(status: OrderStatusEnum, date: Date, message?: string) {
    this.status = status; 
    this.date = date; 
    this.message = message;
  }
}
