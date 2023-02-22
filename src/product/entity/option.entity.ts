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

  constructor(data: EditOptionDto, customization?: Customization) {
    if (customization) {
      this.customization = Reference.create(customization);
    }
    Object.assign(this, data);
  }
}
