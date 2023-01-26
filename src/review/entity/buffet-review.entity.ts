import { Buffet } from "@/buffet/entity/buffet.entity";
import {
  Cascade,
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";

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
  public buffet: IdentifiedReference<Buffet>;
}
