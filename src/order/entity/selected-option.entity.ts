import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { OrderedCustomization } from "./ordered-customization.entity";

@Entity()
export class SelectedOption {
  @Expose()
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Expose()
  @Property({ length: 120 })
  public name: string;

  @Expose()
  @Transform(({ value }) => +value)
  @Property({ type: "decimal" })
  public extraCost: string;

  @ManyToOne(() => OrderedCustomization)
  public customization: IdentifiedReference<OrderedCustomization>;
}
