import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CategoryFactory } from "../factories";

export class CategorySeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    const categoryNames = [
      "Italok",
      "Melegszendvicsek",
      "Péksütik",
      "Édességek",
      "Fast Food",
      "Fincsi ®",
    ];
    for (const categoryName of categoryNames) {
      await new CategoryFactory(em).createOne({ name: categoryName });
    }
  }
}
