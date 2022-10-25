import { Check, Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { UserType } from "../enum/user-type.enum";
import User from "./user.entity";

@Entity()
@Check({ expression: `user_type = ${UserType.BuffetWorker}` })
export default class BuffetWorker {
  @OneToOne({
    inversedBy: (user: User) => user.buffetWorker,
    primary: true,
    eager: true,
  })
  public user!: IdentifiedReference<User>;
}
