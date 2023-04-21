import { Category } from "@/category/entity";
import { RawProduct } from "@/product/entity";
import { OptionCount } from "@/product/option-count.enum";
import { Reference } from "@mikro-orm/core";
import { Dictionary } from "lodash";
import defaultImg from "./product-images/default";

export function getProductData(context: {
  categories: Dictionary<Category>;
}): RawProduct[] {
  return [
    {
      name: "Coca Cola",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Pepsi",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Fanta",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Mountain Dew",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Kinley",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Sonkás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Gombás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Sonkás-kukoricás melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Magyaros melegszendvics",
      category: Reference.create(context.categories["Melegszendvicsek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Mars",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Bounty",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Pogácsa",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Pizzás háromszög",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Kakaóscsiga",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Lekváros bukta",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Perec",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Nyalóka",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [createCandyFlavourCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Gumicukor",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [createCandyFlavourCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Toffix",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [createCandyFlavourCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Snickers",
      category: Reference.create(context.categories["Édességek"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Milky Way",
      category: Reference.create(context.categories["Édességek"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Twix",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Kinder Bueno",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Sonkás-sajtos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Rántott húsos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Tzazikis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Chillis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Kávé",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },
    {
      name: "Forrócsoki",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Hamburger",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Pizza szelet",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Hot Dog",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Csibefalatos-csípős szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Csibefalatos-mézes-mustáros szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Tarjás szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Rántott-csirkemelles szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Szalámis-tojásos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Cappuccino",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Esspresso",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Zöld tea",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Yorkshire Gold tea",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Americano",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Chio Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Tortilla Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Tuc Keksz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Pufi Kukoricasnack",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(defaultImg, "base64"),
      imageType: "image/jpeg",
    },

    {
      name: "Nógrádi Ropogós",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [createSnackSizeCustomization()],
      image: Buffer.from(defaultImg, "base64"),
     imageType: "image/jpeg",
    },
  ];
}

function createSodaSizeCustomization() {
  return {
    description: "Méret",
    optionCount: OptionCount.SingleChoice,
    options: [
      { name: "0,33l", extraCost: 0 },
      { name: "0,5l", extraCost: 25 },
      { name: "1,25l", extraCost: 75 },
      { name: "1,75l", extraCost: 270 },
      { name: "2,25l", extraCost: 415 },
    ],
  };
}

function createSauceCustomization() {
  return {
    description: "Szósz",
    optionCount: OptionCount.MultipleChoice,
    options: [
      { name: "Ketchup", extraCost: 0 },
      { name: "Mustár", extraCost: 0 },
      { name: "Majonéz", extraCost: 0 },
      { name: "BBQ", extraCost: 0 },
      { name: "Pesto", extraCost: 100 },
      { name: "Csípős", extraCost: 0 },
    ],
  };
}

function createCheeseCustomization() {
  return {
    description: "Sajt",
    optionCount: OptionCount.SingleChoice,
    options: [
      { name: "Sajttal", extraCost: 0 },
      { name: "Sajt nélkül", extraCost: 0 },
    ],
  };
}

function createCandyFlavourCustomization() {
  return {
    description: "Íz",
    optionCount: OptionCount.SingleChoice,
    options: [
      { name: "Cola", extraCost: 0 },
      { name: "Narancs", extraCost: 0 },
      { name: "Trópusi gyümölcs", extraCost: 0 },
      { name: "Eper", extraCost: 0 },
      { name: "Dinnye", extraCost: 0 },
      { name: "Erdei gyümölcs", extraCost: 0 },
    ],
  };
}

function createSugarCustomization() {
  return {
    description: "Cukor",
    optionCount: OptionCount.SingleChoice,
    options: [
      { name: "Cukorral", extraCost: 0 },
      { name: "Cukor nélkül", extraCost: 0 },
      { name: "Extra cukorral", extraCost: 20 },
      { name: "Édesítőszerrel", extraCost: 40 },
    ],
  };
}

function createSnackFlavourCustomization() {
  return {
    description: "Íz",
    optionCount: OptionCount.SingleChoice,
    options: [
      { name: "Sós", extraCost: 0 },
      { name: "Sajtos", extraCost: 0 },
      { name: "BBQ", extraCost: 0 },
      { name: "Chilis", extraCost: 0 },
      { name: "Ranch Szósz", extraCost: 0 },
    ],
  };
}

function createSnackSizeCustomization() {
  return {
    description: "Méret",
    optionCount: OptionCount.SingleChoice,
    options: [
      { name: "60g", extraCost: 0 },
      { name: "140g", extraCost: 150 },
      { name: "250g", extraCost: 350 },
    ],
  };
}
