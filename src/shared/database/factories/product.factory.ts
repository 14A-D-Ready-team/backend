import { Product } from "@/product/entity";
import { Factory, Faker } from "@mikro-orm/seeder";

export class ProductFactory extends Factory<Product> {
  public model = Product;

  public definition(faker: Faker): Partial<Product> {
    return {
      name: faker.commerce.product(),
      description: faker.lorem.paragraph(),
      fullPrice: faker.finance.amount(2, 5000, 0),
      discountedPrice: faker.finance.amount(2, 5000, 0),
      stock: +faker.finance.amount(0, 100, 0),
    };
  }
}
