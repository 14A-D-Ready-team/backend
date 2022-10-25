import { Check, Entity, OneToOne } from "@mikro-orm/core";
import { UserType } from "../user-type.enum";
import User from "./user.entity";

@Entity()
@Check({ expression: `user_type = ${UserType.Admin}` })
export default class Admin {
  @OneToOne({
    inversedBy: (user: User) => user.admin,
    primary: true,
  })
  public user!: User;
}
