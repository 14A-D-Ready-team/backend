import { Category } from "@/category/entity";
import { Customization, Option, Product } from "@/product/entity";
import { OptionCount } from "@/product/option-count.enum";
import { Reference } from "@mikro-orm/core";
import { Dictionary } from "lodash";
import defaultImg from "./product-images/default";

type ProductData = Partial<Product> & { customizationsArray?: Customization[] };

export function getProductData(context: {
  categories: Dictionary<Category>;
}): ProductData[] {
  return [
    {
      name: "Coca Cola",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
      image: defaultImg,
    },

    {
      name: "Pepsi",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
      image: defaultImg,
    },

    {
      name: "Fanta",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
      image: defaultImg,
    },

    {
      name: "Mountain Dew",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
      image: defaultImg,
    },

    {
      name: "Kinley",
      category: Reference.create(context.categories["Italok"]),
      customizationsArray: [createSodaSizeCustomization()],
      image: defaultImg,
    },

    {
      name: "Sonkás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Gombás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
      image: defaultImg,
    },
    {
      name: "Sonkás-kukoricás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
      image: defaultImg,
    },
    {
      name: "Magyaros melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
      image: defaultImg,
    },
    {
      name: "Mars",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Bounty",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Pogácsa",
      category: Reference.create(context.categories["Péksütik"]),
      image: defaultImg,
    },

    {
      name: "Pizzás háromszög",
      category: Reference.create(context.categories["Péksütik"]),
      image: defaultImg,
    },

    {
      name: "Kakaóscsiga",
      category: Reference.create(context.categories["Péksütik"]),
      image: defaultImg,
    },

    {
      name: "Lekváros bukta",
      category: Reference.create(context.categories["Péksütik"]),
      image: defaultImg,
    },

    {
      name: "Perec",
      category: Reference.create(context.categories["Péksütik"]),
      image: defaultImg,
    },

    {
      name: "Nyalóka",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [createCandyFlavourCustomization()],
      image: defaultImg,
    },

    {
      name: "Gumicukor",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [createCandyFlavourCustomization()],
      image: defaultImg,
    },

    {
      name: "Toffix",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [createCandyFlavourCustomization()],
      image: defaultImg,
    },

    {
      name: "Snickers",
      category: Reference.create(context.categories["Édességek"]),
      image: defaultImg,
    },

    {
      name: "Milky Way",
      category: Reference.create(context.categories["Édességek"]),
      image: defaultImg,
    },

    {
      name: "Twix",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Kinder Bueno",
      category: Reference.create(context.categories["Édességek"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Sonkás-sajtos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Rántott húsos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Tzazikis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Chillis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizationsArray: [],
      image: defaultImg,
    },
    {
      name: "Kávé",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
      image: defaultImg,
    },
    {
      name: "Forrócsoki",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
      image: defaultImg,
    },

    {
      name: "Hamburger",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Pizza szelet",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Hot Dog",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizationsArray: [
        createSauceCustomization(),
        createCheeseCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Csibefalatos-csípős fincsi szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: defaultImg,
    },

    {
      name: "Csibefalatos-mézes-mustáros fincsi szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: defaultImg,
    },

    {
      name: "Tarjás fincsi szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: defaultImg,
    },

    {
      name: "Rántott-csirkemelles fincsi szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: defaultImg,
    },

    {
      name: "Szalámis-tojásos fincsi szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: defaultImg,
    },

    {
      name: "Cappuccino",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
      image: defaultImg,
    },

    {
      name: "Esspresso",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
      image: defaultImg,
    },

    {
      name: "Zöld tea",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
      image: defaultImg,
    },

    {
      name: "Yorkshire Gold",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
      image: defaultImg,
    },

    {
      name: "Americano",
      category: Reference.create(context.categories["Forró italok"]),
      customizationsArray: [createSugarCustomization()],
      image: defaultImg,
    },

    {
      name: "Chio Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Tortilla Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Tuc Keksz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Pufi Kukoricasnack",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: defaultImg,
    },

    {
      name: "Nógrádi Ropogós",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizationsArray: [createSnackSizeCustomization()],
      image: defaultImg,
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
