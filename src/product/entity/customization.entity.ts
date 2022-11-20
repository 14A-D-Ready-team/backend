import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { OptionCount } from "../option-count.enum";
import { Option } from "./option.entity";
import { Product } from "./product.entity";

@Entity()
export class Customization {
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Property({ length: 120 })
  public description: string;

  @Enum()
  public optionCount: OptionCount;

  @OneToMany(() => Option, option => option.customization, {
    orphanRemoval: true,
  })
  public options = new Collection<Option>(this);

  @ManyToOne()
  public product: Product;
}
