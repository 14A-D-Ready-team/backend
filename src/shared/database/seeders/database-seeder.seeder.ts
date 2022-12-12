import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CategoryFactory } from "../factories";
import { CategorySeeder } from "./category-seeder.seeder";
import { ProductSeeder } from "./product-seeder.seeder";

export class DatabaseSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    this.call(em, [CategorySeeder, ProductSeeder]);
  }
}
