import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { CategoryFactory } from "../factories";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new CategoryFactory(em).create(12);
  }
}
