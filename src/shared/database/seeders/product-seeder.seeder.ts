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
        name: "Coca Cola",
        category: Reference.create(context.categories["Italok"]),
        customizationsArray: [
          this.createSodaSizeCustomization(),
        ],
      },

      {
        name: "Pepsi",
        category: Reference.create(context.categories["Italok"]),
        customizationsArray: [
          this.createSodaSizeCustomization(),
        ],
      },

      {
        name: "Fanta",
        category: Reference.create(context.categories["Italok"]),
        customizationsArray: [
          this.createSodaSizeCustomization(),
        ],
      },

      {
        name: "Mountain Dew",
        category: Reference.create(context.categories["Italok"]),
        customizationsArray: [
          this.createSodaSizeCustomization(),
        ],
      },

      {
        name: "Kinley",
        category: Reference.create(context.categories["Italok"]),
        customizationsArray: [
          this.createSodaSizeCustomization(),
        ],
      },

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

      {
        name: "Magyaros melegszendvics",
        category: Reference.create(context.categories["Melegszendvicsek"]),
        customizationsArray: [
          this.createSauceCustomization(),
          this.createCheeseCustomization(),
        ],
      },

      {
        name: "Pogácsa",
        category: Reference.create(context.categories["Péksütik"]),
      },

      {
        name: "Pizzás háromszög",
        category: Reference.create(context.categories["Péksütik"]),
      },

      {
        name: "Kakaóscsiga",
        category: Reference.create(context.categories["Péksütik"]),
      },

      {
        name: "Lekváros bukta",
        category: Reference.create(context.categories["Péksütik"]),
      },

      {
        name: "Perec",
        category: Reference.create(context.categories["Péksütik"]),
      },

      {
        name: "Nyalóka",
        category: Reference.create(context.categories["Édességek"]),
        customizationsArray: [
          this.createCandyFlavourCustomization(),
        ],
      },

      {
        name: "Gumicukor",
        category: Reference.create(context.categories["Édességek"]),
        customizationsArray: [
          this.createCandyFlavourCustomization(),
        ],
      },

      {
        name: "Toffix",
        category: Reference.create(context.categories["Édességek"]),
        customizationsArray: [
          this.createCandyFlavourCustomization(),
        ],
      },

      {
        name: "Snickers",
        category: Reference.create(context.categories["Édességek"]),
      },

      {
        name: "Milky Way",
        category: Reference.create(context.categories["Édességek"]),
      },

      {
        name: "Twix",
        category: Reference.create(context.categories["Édességek"]),
      },

      {
        name: "Hamburger",
        category: Reference.create(context.categories["Gyorsételek"]),
        customizationsArray: [
          this.createSauceCustomization(),
          this.createCheeseCustomization(),
        ],
      },

      {
        name: "Pizza szelet",
        category: Reference.create(context.categories["Gyorsételek"]),
        customizationsArray: [
          this.createSauceCustomization(),
          this.createCheeseCustomization(),
        ],
      },

      {
        name: "Hot Dog",
        category: Reference.create(context.categories["Gyorsételek"]),
        customizationsArray: [
          this.createSauceCustomization(),
          this.createCheeseCustomization(),
        ],
      },

      {
        name: "Csibefalatos-csípős fincsi szendvics",
        category: Reference.create(context.categories["Fincsi ®"]),
      },

      {
        name: "Csibefalatos-mézes-mustáros fincsi szendvics",
        category: Reference.create(context.categories["Fincsi ®"]),
      },

      {
        name: "Tarjás fincsi szendvics",
        category: Reference.create(context.categories["Fincsi ®"]),
      },

      {
        name: "Rántott-csirkemelles fincsi szendvics",
        category: Reference.create(context.categories["Fincsi ®"]),
      },

      {
        name: "Szalámis-tojásos fincsi szendvics",
        category: Reference.create(context.categories["Fincsi ®"]),
      },

      {
        name: "Cappuccino",
        category: Reference.create(context.categories["Forró italok"]),
        customizationsArray: [
          this.createSugarCustomization(),
        ],
      },

      {
        name: "Esspresso",
        category: Reference.create(context.categories["Forró italok"]),
        customizationsArray: [
          this.createSugarCustomization(),
        ],
      },

      {
        name: "Zöld tea",
        category: Reference.create(context.categories["Forró italok"]),
        customizationsArray: [
          this.createSugarCustomization(),
        ],
      },

      {
        name: "Yorkshire Gold",
        category: Reference.create(context.categories["Forró italok"]),
        customizationsArray: [
          this.createSugarCustomization(),
        ],
      },

      {
        name: "Americano",
        category: Reference.create(context.categories["Forró italok"]),
        customizationsArray: [
          this.createSugarCustomization(),
        ],
      },

      {
        name: "Chio Chipsz",
        category: Reference.create(context.categories["Nassolnivalók"]),
        customizationsArray: [
          this.createSnackFlavourCustomization(),
          this.createSnackSizeCustomization(),
        ],
      },

      {
        name: "Tortilla Chipsz",
        category: Reference.create(context.categories["Nassolnivalók"]),
        customizationsArray: [
          this.createSnackFlavourCustomization(),
          this.createSnackSizeCustomization(),
        ],
      },

      {
        name: "Tuc Keksz",
        category: Reference.create(context.categories["Nassolnivalók"]),
        customizationsArray: [
          this.createSnackFlavourCustomization(),
          this.createSnackSizeCustomization(),
        ],
      },

      {
        name: "Pufi Kukoricasnack",
        category: Reference.create(context.categories["Nassolnivalók"]),
        customizationsArray: [
          this.createSnackFlavourCustomization(),
          this.createSnackSizeCustomization(),
        ],
      },

      {
        name: "Nógrádi Ropogós",
        category: Reference.create(context.categories["Nassolnivalók"]),
        customizationsArray: [
          this.createSnackSizeCustomization(),
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

  private createSodaSizeCustomization() {
    const c = new Customization("Méret", OptionCount.MultipleChoice);
    const options = [
      new Option("0,33l", 0, c),
      new Option("0,5l", 25, c),
      new Option("1,25l", 75, c),
      new Option("1,75l", 270, c),
      new Option("2,25l", 415, c),
    ];
    c.options.add(options);
    return c;
  }

  private createSauceCustomization() {
    const c = new Customization("Szósz", OptionCount.MultipleChoice);
    const options = [
      new Option("Ketchup", 0, c),
      new Option("Mustár", 0, c),
      new Option("Majonéz", 0, c),
      new Option("BBQ", 0, c),
      new Option("Pesto", 100, c),
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

  private createCandyFlavourCustomization() {
    const c = new Customization("Íz", OptionCount.MultipleChoice);
    const options = [
      new Option("Cola", 0, c),
      new Option("Narancs", 0, c),
      new Option("Trópusi gyümölcs", 0, c),
      new Option("Eper", 0, c),
      new Option("Dinnye", 0, c),
      new Option("Erdei gyümölcs", 0, c),
    ];
    c.options.add(options);
    return c;
  }

  private createSugarCustomization() {
    const c = new Customization("Cukor", OptionCount.MultipleChoice);
    const options = [
      new Option("Cukorral", 0, c),
      new Option("Cukor nélkül", 0, c),
      new Option("Extra cukorral", 20, c),
    ];
    c.options.add(options);
    return c;
  }

  private createSnackFlavourCustomization() {
    const c = new Customization("Íz", OptionCount.MultipleChoice);
    const options = [
      new Option("Sós", 0, c),
      new Option("Sajtos", 0, c),
      new Option("BBQ", 0, c),
      new Option("Chilis", 0, c),
      new Option("Ranch Szósz", 0, c),
    ];
    c.options.add(options);
    return c;
  }

  private createSnackSizeCustomization() {
    const c = new Customization("Méret", OptionCount.MultipleChoice);
    const options = [
      new Option("60g", 0, c),
      new Option("140g", 150, c),
      new Option("250g", 350, c),
    ];
    c.options.add(options);
    return c;
  }
}
