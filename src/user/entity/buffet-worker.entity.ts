import { Entity, IdentifiedReference, OneToOne } from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class BuffetWorker {
  @OneToOne({
    inversedBy: (user: User) => user.buffetWorker,
    primary: true,
  })
  public user!: IdentifiedReference<User>;
}
