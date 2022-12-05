import { Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class BuffetOwner {
  @OneToOne({
    inversedBy: (user: User) => user.buffetOwner,
    primary: true,
  })
  public user!: IdentifiedReference<User>;
}
