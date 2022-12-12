import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Customization } from "./customization.entity";

@Entity()
export class Option {
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Property({ length: 120 })
  public name: string;

  @Property({ type: "decimal" })
  public extraCost: number;

  @ManyToOne()
  public customization: Customization;
}
