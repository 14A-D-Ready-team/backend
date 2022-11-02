import { Check, Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { UserType } from "../enum";
import { User } from "./user.entity";

@Entity()
@Check({ expression: `user_type = ${UserType.BuffetOwner}` })
export class BuffetOwner {
  @OneToOne({
    inversedBy: (user: User) => user.buffetOwner,
    primary: true,
  })
  public user!: IdentifiedReference<User>;
}
