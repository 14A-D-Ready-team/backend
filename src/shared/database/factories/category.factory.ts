import { Category } from "@/category/entity";
import { Factory, Faker } from "@mikro-orm/seeder";

export class CategoryFactory extends Factory<Category> {
  public model = Category;

  public definition(faker: Faker): Partial<Category> {
    return {
      name: faker.commerce.product(),
    };
  }
}
