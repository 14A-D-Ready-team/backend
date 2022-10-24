import { Entity, OneToOne } from "@mikro-orm/core";
import User from "./user.entity";

@Entity()
export default class Customer {
  @OneToOne({
    inversedBy: (user: User) => user.customer,
    primary: true,
  })
  user!: User;
}
