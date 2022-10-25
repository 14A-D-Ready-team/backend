import { Check, Entity, OneToOne } from "@mikro-orm/core";
import { UserType } from "../user-type.enum";
import User from "./user.entity";

@Entity()
@Check({ expression: `user_type = ${UserType.Customer}` })
export default class Customer {
  @OneToOne({
    inversedBy: (user: User) => user.customer,
    primary: true,
  })
  public user!: User;
}
