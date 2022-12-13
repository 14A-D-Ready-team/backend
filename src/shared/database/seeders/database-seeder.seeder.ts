import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { SeederContext } from "../utils";
import { CategorySeeder } from "./category-seeder.seeder";
import { ProductSeeder } from "./product-seeder.seeder";

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    await this.call(em, [CategorySeeder, ProductSeeder], {} as SeederContext);
  }
}
