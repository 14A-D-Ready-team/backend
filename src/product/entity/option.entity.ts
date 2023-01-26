import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  Reference,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { Customization } from "./customization.entity";

@Entity()
export class Option {
  @Expose()
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Expose()
  @Property({ length: 120 })
  public name: string;

  @Expose()
  @Property({ type: "decimal" })
  public extraCost: number;

  @ManyToOne()
  public customization: IdentifiedReference<Customization>;

  constructor(name: string, extraCost: number, customization?: Customization) {
    this.name = name;
    this.extraCost = extraCost;
    if (customization) {
      this.customization = Reference.create(customization);
    }
  }
}
