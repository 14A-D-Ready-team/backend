import { EntityManager, Reference } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CategoryFactory } from "../factories";
import { SeederContext } from "../utils";
import { getCategoryData } from "./category.data";

export class CategorySeeder extends Seeder {
  public async run(em: EntityManager, context: SeederContext): Promise<void> {
    const categories = getCategoryData(context).map(d => {
      const category = new CategoryFactory(em).makeOne({ ...d });
      context.categories = {
        ...(context.categories || {}),
        [d.name]: category,
      };
      return category;
    });
    await em.persistAndFlush(categories);
  }
}
