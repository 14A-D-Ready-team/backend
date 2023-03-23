import { Buffet } from "@/buffet/entity/buffet.entity";
import {
  Cascade,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToOne,
  Reference,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { User } from "./user.entity";

@Entity()
export class BuffetWorker {
  @OneToOne({
    inversedBy: (user: User) => user.buffetWorker,
    primary: true,
  })
  public user!: IdentifiedReference<User>;

  @Expose({ name: "buffetId" })
  @Transform(({ value }) => value.id)
  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffet: IdentifiedReference<Buffet>;

  constructor(buffet: Buffet) {
    this.buffet = Reference.create(buffet);
  }
}
