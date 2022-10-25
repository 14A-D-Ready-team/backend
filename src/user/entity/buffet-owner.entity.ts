import { Check, Entity, OneToOne } from "@mikro-orm/core";
import { UserType } from "../user-type.enum";
import User from "./user.entity";

@Entity()
@Check({ expression: `user_type = ${UserType.BuffetOwner}` })
export default class BuffetOwner {
  @OneToOne({
    inversedBy: (user: User) => user.buffetOwner,
    primary: true,
  })
  public user!: User;
}
