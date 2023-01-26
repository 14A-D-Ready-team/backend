import { Customization, Option, Product } from "@/product/entity";
import { OptionCount } from "@/product/option-count.enum";
import { EntityManager, Reference } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "../factories";
import type { SeederContext } from "../utils";
import { getProductData } from "./product.data";

export class ProductSeeder extends Seeder {
  public async run(em: EntityManager, context: SeederContext): Promise<void> {
    const products = getProductData(context).map(p => {
      const customizations = p.customizationsArray!;
      delete p.customizationsArray;
      const product = new ProductFactory(em).makeOne(p);
      product.customizations.add(customizations);
      return product;
    });

    await em.persistAndFlush(products);
  }
}
