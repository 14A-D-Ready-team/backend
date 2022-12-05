import { Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class Customer {
  @OneToOne({
    inversedBy: (user: User) => user.customer,
    primary: true,
  })
  public user!: IdentifiedReference<User>;
}
