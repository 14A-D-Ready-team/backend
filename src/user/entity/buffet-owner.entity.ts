import { Check, Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { UserType } from "../enum";
import User from "./user.entity";

@Entity()
@Check({ expression: `user_type = ${UserType.BuffetOwner}` })
export default class BuffetOwner {
  @OneToOne({
    inversedBy: (user: User) => user.buffetOwner,
    primary: true,
    eager: true,
  })
  public user!: IdentifiedReference<User>;
}