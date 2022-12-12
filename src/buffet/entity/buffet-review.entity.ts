import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { Buffet } from "./buffet.entity";

@Entity()
export class BuffetReview {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id: number;

  @Property({ type: "decimal" })
  public stars: number;

  @ManyToOne({
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffet: Buffet;
}
