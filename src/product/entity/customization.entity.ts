import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { OptionCount } from "../option-count.enum";
import { Option } from "./option.entity";
import { Product } from "./product.entity";

@Entity()
export class Customization {
  @Expose()
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Expose()
  @Property({ length: 120 })
  public description: string;

  @Expose()
  @Enum()
  public optionCount: OptionCount;

  @Expose()
  @Transform(params => {
    const value = params.value as Collection<Option>;
    return value ? value.getItems() : [];
  })
  @OneToMany(() => Option, option => option.customization, {
    orphanRemoval: true,
  })
  public options = new Collection<Option>(this);

  @ManyToOne()
  public product: Product;
}
