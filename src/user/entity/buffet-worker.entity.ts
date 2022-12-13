import { Buffet } from "@/buffet/entity/buffet.entity";
import { Cascade, Entity, IdentifiedReference, ManyToOne, OneToOne } from "@mikro-orm/core";
import { User } from "./user.entity";

@Entity()
export class BuffetWorker {
  @OneToOne({
    inversedBy: (user: User) => user.buffetWorker,
    primary: true,
  })
  public user!: IdentifiedReference<User>;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffet: Buffet;
}
