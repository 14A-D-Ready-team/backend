import {
  Collection,
  Entity,
  IdentifiedReference,
  OneToMany,
  OneToOne,
} from "@mikro-orm/core";
import { User } from "./user.entity";
import { Order } from "@/order/entity/order.entity";

@Entity()
export class Customer {
  @OneToOne({
    inversedBy: (user: User) => user.customer,
    primary: true,
  })
  public user!: IdentifiedReference<User>;

  @OneToMany(() => Order, order => order.customer, {
    orphanRemoval: true,
  })
  public orders = new Collection<Order>(this);
}
