import { Product } from "@/product/entity";
import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "../factories";

export class ProductSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    const productData: Partial<Product>[] = [{ name: "Sonkás melegszendvics" }];

    for (const product of productData) {
      await new ProductFactory(em).createOne(product);
    }
  }
}
