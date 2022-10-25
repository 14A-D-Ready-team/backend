import { Check, Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { UserType } from "../enum";
import User from "./user.entity";

@Entity()
@Check({ expression: `user_type = ${UserType.Admin}` })
export default class Admin {
  @OneToOne({
    inversedBy: (user: User) => user.admin,
    primary: true,
    eager: true,
  })
  public user!: IdentifiedReference<User>;
}
