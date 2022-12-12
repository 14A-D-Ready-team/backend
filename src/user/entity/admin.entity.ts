import { Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class Admin {
  @OneToOne({
    inversedBy: (user: User) => user.admin,
    primary: true,
  })
  public user!: IdentifiedReference<User>;
}
