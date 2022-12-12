import { serializeCollection } from "@/shared/serialization";
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
  @Transform(serializeCollection)
  @OneToMany(() => Option, option => option.customization, {
    orphanRemoval: true,
    eager: true,
  })
  public options = new Collection<Option>(this);

  @ManyToOne()
  public product: Product;
}
