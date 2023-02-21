import { serializeCollection } from "@/shared/serialization";
import {
  Cascade,
  Collection,
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { EditCustomizationDto } from "../dto";
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
    cascade: [Cascade.ALL],
  })
  public options = new Collection<Option>(this);

  @ManyToOne()
  public product: IdentifiedReference<Product>;

  constructor(data: EditCustomizationDto);
  constructor(
    description: string,
    optionCount: OptionCount,
    options?: Option[],
  );
  constructor(
    param1: string | EditCustomizationDto,
    optionCount?: OptionCount,
    options?: Option[],
  ) {
    if (typeof param1 === "string") {
      this.description = param1;
      this.optionCount = optionCount!;
      this.options = new Collection<Option>(this, options);
    } else {
      const { options, ...rest } = param1;
      Object.assign(this, rest);
      if (options) {
        this.options = new Collection<Option>(
          this,
          options.map(o => new Option(o)),
        );
      }
    }
  }
}
