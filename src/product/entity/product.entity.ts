import { Buffet } from "@/buffet/entity/buffet.entity";
import { Category } from "@/category/entity";
import { serializeCollection } from "@/shared/serialization";
import {
  Cascade,
  Collection,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Expose, Transform } from "class-transformer";
import { EditCustomizationDto } from "../dto";
import { Customization } from "./customization.entity";

@Entity()
export class Product {
  @Expose()
  @PrimaryKey({ autoincrement: true })
  public id: number;

  @Expose()
  @Property({ length: 100 })
  public name: string;

  @Expose()
  @Property({ length: 500 })
  public description: string;

  @Expose()
  @Property({ type: "decimal" })
  public fullPrice: number;

  @Expose()
  @Property({ type: "decimal" })
  public discountedPrice?: number;

  @Expose()
  @Property({ type: "integer" })
  public stock: number;

  @Property({ length: 10000000 })
  public image: string;

  @Property({ length: 35 })
  public imageType: string;

  @ManyToOne({
    entity: () => Buffet,
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public buffet?: Buffet;

  @Expose({ name: "categoryId" })
  @Transform(params => {
    const value = params.value as Category;
    return value?.id;
  })
  @ManyToOne({
    entity: () => Category,
    cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.CANCEL_ORPHAN_REMOVAL],
  })
  public category: IdentifiedReference<Category>;

  @Expose()
  @Transform(serializeCollection)
  @OneToMany(() => Customization, customization => customization.product, {
    orphanRemoval: true,
    eager: true,
    cascade: [Cascade.ALL],
  })
  public customizations = new Collection<Customization>(this);

  constructor(
    data: Partial<Product> & { customizations?: EditCustomizationDto[] } = {},
  ) {
    const { customizations, ...rest } = data;
    Object.assign(this, rest);
    if (customizations) {
      this.customizations = new Collection<Customization>(
        this,
        customizations.map(c => new Customization(c)),
      );
      console.log(this.customizations.getItems());
    }
  }
}
