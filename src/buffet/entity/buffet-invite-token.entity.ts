import { Cascade, Entity, PrimaryKey } from "@mikro-orm/core";
import { ManyToOne } from "@mikro-orm/core/decorators";
import { Expose } from "class-transformer";
import { Buffet } from "./buffet.entity";

@Entity()
export class BuffetInviteToken {
  @PrimaryKey({ type: "uuid" })
  public id!: string;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffet: Buffet;
}
