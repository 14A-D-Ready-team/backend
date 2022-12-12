import {
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { BuffetStatusEnum } from "../enum/buffet-status.enum";
import { Buffet } from "./buffet.entity";

@Entity()
export class BuffetStatus {
  @PrimaryKey({ autoincrement: true })
  @Expose()
  public id: number;

  @Enum()
  @Expose()
  public status: BuffetStatusEnum;

  @Property({ length: 100 })
  @Expose()
  public date: Date;

  @ManyToOne({ eager: true })
  public buffet: IdentifiedReference<Buffet>;

}
