import { Customization, Option, Product } from "@/product/entity";
import { OptionCount } from "@/product/option-count.enum";
import { EntityManager, Reference } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "../factories";
import type { SeederContext } from "../utils";

type ProductData = Partial<Product> & { customizationsArray?: Customization[] };

export class ProductSeeder extends Seeder {
  public async run(em: EntityManager, context: SeederContext): Promise<void> {
    const productData: ProductData[] = [
      {
        name: "Sonkás melegszendvics",
        category: Reference.create(context.categories["Melegszendvicsek"]),
        customizationsArray: [
          this.createSauceCustomization(),
          this.createCheeseCustomization(),
        ],
      },
      {
        name: "Gombás melegszendvics",
        category: Reference.create(context.categories["Melegszendvicsek"]),
        customizationsArray: [
          this.createSauceCustomization(),
          this.createCheeseCustomization(),
        ],
      },
    ];

    const products = productData.map(p => {
      const customizations = p.customizationsArray!;
      delete p.customizationsArray;
      const product = new ProductFactory(em).makeOne(p);
      product.customizations.add(customizations);
      return product;
    });

    await em.persistAndFlush(products);
  }

  private createSauceCustomization() {
    const c = new Customization("Szósz", OptionCount.MultipleChoice);
    const options = [
      new Option("Ketchup", 0, c),
      new Option("Mustár", 0, c),
      new Option("Majonéz", 0, c),
      new Option("BBQ", 0, c),
      new Option("Pesto", 0, c),
      new Option("Csípős", 0, c),
    ];
    c.options.add(options);
    return c;
  }

  private createCheeseCustomization() {
    const c = new Customization("Sajt", OptionCount.MultipleChoice);
    const options = [
      new Option("Sajttal", 0, c),
      new Option("Sajt nélkül", 0, c),
    ];
    c.options.add(options);
    return c;
  }
}