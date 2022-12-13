import { Product } from "@/product/entity";
import { EntityManager, Reference } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "../factories";
import type { SeederContext } from "../utils";

export class ProductSeeder extends Seeder {
  public async run(em: EntityManager, context: SeederContext): Promise<void> {
    const productData: Partial<Product>[] = [
      {
        name: "Sonkás melegszendvics",
        category: Reference.create(context.categories["Melegszendvicsek"]),
      },
    ];

    const products = productData.map(p => new ProductFactory(em).makeOne(p));

    await em.persistAndFlush(products);
  }
}
