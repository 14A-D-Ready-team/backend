import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CategoryFactory } from "../factories";
import { SeederContext } from "../utils";

export class CategorySeeder extends Seeder {
  public async run(em: EntityManager, context: SeederContext): Promise<void> {
    const categoryNames = [
      "Italok",
      "Melegszendvicsek",
      "Péksütik",
      "Édességek",
      "Gyorsételek",
      "Fincsi ®",
      "Forró italok",
      "Nassolnivalók",
    ];
    const categories = categoryNames.map(n => {
      const category = new CategoryFactory(em).makeOne({ name: n });
      context.categories = { ...(context.categories || {}), [n]: category };
      return category;
    });
    await em.persistAndFlush(categories);
  }
}
