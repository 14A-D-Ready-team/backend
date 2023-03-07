import {
  Cascade,
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { Buffet } from "./buffet.entity";

@Entity()
export class BuffetInviteToken {
  @PrimaryKey({ type: "uuid" })
  @Expose()
  public id!: string;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffet: IdentifiedReference<Buffet>;
}
