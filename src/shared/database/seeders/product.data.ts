import { Category } from "@/category/entity";
import { Customization, Option, Product } from "@/product/entity";
import { OptionCount } from "@/product/option-count.enum";
import { Reference } from "@mikro-orm/core";
import { Dictionary } from "lodash";

type ProductData = Partial<Product> & { customizationsArray?: Customization[] };

export function getProductData(context: {
  categories: Dictionary<Category>;
}): ProductData[] {
  return [
    {
      name: "Coca Cola",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
    },

    {
      name: "Pepsi",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
    },

    {
      name: "Fanta",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
    },

    {
      name: "Mountain Dew",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
    },

    {
      name: "Kinley",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
    },

    {
      name: "Sonkás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
    },

    {
      name: "Gombás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
    },
    {
      name: "Sonkás-kukoricás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
    },
    {
      name: "Magyaros melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
    },
    {
      name: "Mars",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [],
    },
    {
      name: "Bounty",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [],
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
      customizationsArray: [createCandyFlavourCustomization()],
    },

    {
      name: "Gumicukor",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [createCandyFlavourCustomization()],
    },

    {
      name: "Toffix",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [createCandyFlavourCustomization()],
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
      customizationsArray: [],
    },
    {
      name: "Kinder Bueno",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [],
    },
    {
      name: "Sonkás-sajtos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
    },
    {
      name: "Rántott húsos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
    },
    {
      name: "Tzazikis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
    },
    {
      name: "Chillis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
    },
    {
      name: "Kávé",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
    },
    {
      name: "Forrócsoki",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
    },

    {
      name: "Hamburger",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
    },

    {
      name: "Pizza szelet",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
    },

    {
      name: "Hot Dog",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
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
      customizationsArray: [createSugarCustomization()],
    },

    {
      name: "Esspresso",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
    },

    {
      name: "Zöld tea",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
    },

    {
      name: "Yorkshire Gold",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
    },

    {
      name: "Americano",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
    },

    {
      name: "Chio Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
    },

    {
      name: "Tortilla Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
    },

    {
      name: "Tuc Keksz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
    },

    {
      name: "Pufi Kukoricasnack",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
    },

    {
      name: "Nógrádi Ropogós",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [createSnackSizeCustomization()],
    },
  ];
}

function createSodaSizeCustomization() {
  const c = new Customization("Méret", OptionCount.SingleChoice);
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

function createSauceCustomization() {
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

function createCheeseCustomization() {
  const c = new Customization("Sajt", OptionCount.SingleChoice);
  const options = [
    new Option("Sajttal", 0, c),
    new Option("Sajt nélkül", 0, c),
  ];
  c.options.add(options);
  return c;
}

function createCandyFlavourCustomization() {
  const c = new Customization("Íz", OptionCount.SingleChoice);
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

function createSugarCustomization() {
  const c = new Customization("Cukor", OptionCount.SingleChoice);
  const options = [
    new Option("Cukorral", 0, c),
    new Option("Cukor nélkül", 0, c),
    new Option("Extra cukorral", 20, c),
    new Option("Édesítőszerrel", 40, c),
  ];
  c.options.add(options);
  return c;
}

function createSnackFlavourCustomization() {
  const c = new Customization("Íz", OptionCount.SingleChoice);
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

function createSnackSizeCustomization() {
  const c = new Customization("Méret", OptionCount.SingleChoice);
  const options = [
    new Option("60g", 0, c),
    new Option("140g", 150, c),
    new Option("250g", 350, c),
  ];
  c.options.add(options);
  return c;
}
