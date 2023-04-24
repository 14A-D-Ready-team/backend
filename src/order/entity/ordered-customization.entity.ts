import { OptionCount } from "@/product/option-count.enum";
import {
  Collection,
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { OrderedProduct } from "./ordered-product.entity";
import { SelectedOption } from "./selected-option.entity";

@Entity()
export class OrderedCustomization {
  @Expose()
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Expose()
  @Property({ length: 120 })
  public description: string;

  @Expose()
  @Enum()
  public optionCount: OptionCount;

  @ManyToOne(() => OrderedProduct)
  public orderedProduct: IdentifiedReference<OrderedProduct>;

  @OneToMany(() => SelectedOption, option => option.customization)
  public options = new Collection<SelectedOption>(this);
}
