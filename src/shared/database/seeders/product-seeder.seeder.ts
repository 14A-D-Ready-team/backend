import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "../factories";
import type { SeederContext } from "../utils";
import { getProductData } from "./product.data";

export class ProductSeeder extends Seeder {
  public async run(em: EntityManager, context: SeederContext): Promise<void> {
    for (const p of getProductData(context)) {
      const product = new ProductFactory(em).makeOne(p);

      await em.persistAndFlush(product);
    }
  }
}
