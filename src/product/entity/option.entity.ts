import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  Reference,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { EditOptionDto } from "../dto";
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

  constructor(data: EditOptionDto);
  constructor(name: string, extraCost: number, customization?: Customization);
  constructor(
    param1: string | EditOptionDto,
    extraCost?: number,
    customization?: Customization,
  ) {
    if (typeof param1 === "string") {
      this.name = param1;
      this.extraCost = extraCost!;
      if (customization) {
        this.customization = Reference.create(customization);
      }
    } else {
      Object.assign(this, param1);
    }
  }
}
