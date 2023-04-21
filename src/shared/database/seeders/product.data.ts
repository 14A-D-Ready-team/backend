import { Category } from "@/category/entity";
import { RawProduct } from "@/product/entity";
import { OptionCount } from "@/product/option-count.enum";
import { Reference } from "@mikro-orm/core";
import { Dictionary } from "lodash";
import candyImg from "./product-images/candy";
import defaultImg from "./product-images/default";
import fastfoodImg from "./product-images/fastfood";
import fincsiImg from "./product-images/fincsi";
import hotdrinkImg from "./product-images/hotdrink";
import pastryImg from "./product-images/pastry";
import snackImg from "./product-images/snack";
import sodaImg from "./product-images/soda";
import { SeederContext } from "../utils";

export function getProductData(context: SeederContext): RawProduct[] {
  return [
    //Jedlik
    {
      name: "Coca Cola",
      category: Reference.create(context.categories["Üdítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pepsi",
      category: Reference.create(context.categories["Üdítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Fanta",
      category: Reference.create(context.categories["Üdítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Mountain Dew",
      category: Reference.create(context.categories["Üdítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Kinley",
      category: Reference.create(context.categories["Üdítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Mars",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Bounty",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Pogácsa",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(pastryImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pizzás háromszög",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(pastryImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Kakaóscsiga",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(pastryImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Lekváros bukta",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(pastryImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Perec",
      category: Reference.create(context.categories["Péksütik"]),
      image: Buffer.from(pastryImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Nyalóka",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [createCandyFlavourCustomization()],
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Gumicukor",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [createCandyFlavourCustomization()],
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Toffix",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [createCandyFlavourCustomization()],
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Snickers",
      category: Reference.create(context.categories["Édességek"]),
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Milky Way",
      category: Reference.create(context.categories["Édességek"]),
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Twix",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Kinder Bueno",
      category: Reference.create(context.categories["Édességek"]),
      customizations: [],
      image: Buffer.from(candyImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Sonkás-sajtos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Rántott húsos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Tzazikis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Chillis gyros",
      category: Reference.create(context.categories["Fincsi ®"]),
      customizations: [],
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Csibefalatos-csípős szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Csibefalatos-mézes-mustáros szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Tarjás szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Rántott-csirkemelles szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Szalámis-tojásos szendvics",
      category: Reference.create(context.categories["Fincsi ®"]),
      image: Buffer.from(fincsiImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Kávé",
      category: Reference.create(context.categories["Kávék & Teák"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Forrócsoki",
      category: Reference.create(context.categories["Kávék & Teák"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Cappuccino",
      category: Reference.create(context.categories["Kávék & Teák"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Esspresso",
      category: Reference.create(context.categories["Kávék & Teák"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Zöld tea",
      category: Reference.create(context.categories["Kávék & Teák"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Yorkshire Gold tea",
      category: Reference.create(context.categories["Kávék & Teák"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Americano",
      category: Reference.create(context.categories["Kávék & Teák"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Chio Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Tortilla Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Tuc Keksz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pufi Kukoricasnack",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Nógrádi Ropogós",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [createSnackSizeCustomization()],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    //Sörkert
    {
      name: "Coca Cola",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pepsi",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Fanta",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Mountain Dew",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Kinley",
      category: Reference.create(context.categories["Italok"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
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
      name: "Chio Chipsz",
      category: Reference.create(context.categories["Nasik"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Tortilla Chipsz",
      category: Reference.create(context.categories["Nasik"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Tuc Keksz",
      category: Reference.create(context.categories["Nasik"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pufi Kukoricasnack",
      category: Reference.create(context.categories["Nasik"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Nógrádi Ropogós",
      category: Reference.create(context.categories["Nasik"]),
      customizations: [createSnackSizeCustomization()],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    //Tóni
    {
      name: "Coca Cola",
      category: Reference.create(context.categories["Frissítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pepsi",
      category: Reference.create(context.categories["Frissítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Fanta",
      category: Reference.create(context.categories["Frissítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Mountain Dew",
      category: Reference.create(context.categories["Frissítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Kinley",
      category: Reference.create(context.categories["Frissítők"]),
      customizations: [createSodaSizeCustomization()],
      image: Buffer.from(sodaImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Kávé",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Forrócsoki",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },
    {
      name: "Cappuccino",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Esspresso",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Zöld tea",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Yorkshire Gold tea",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Americano",
      category: Reference.create(context.categories["Forró italok"]),
      customizations: [createSugarCustomization()],
      image: Buffer.from(hotdrinkImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Hamburger",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(fastfoodImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pizza szelet",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(fastfoodImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Hot Dog",
      category: Reference.create(context.categories["Gyorsételek"]),
      customizations: [createSauceCustomization(), createCheeseCustomization()],
      image: Buffer.from(fastfoodImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Chio Chipsz",
      category: Reference.create(context.categories["Nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Tortilla Chipsz",
      category: Reference.create(context.categories["Sós nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Tuc Keksz",
      category: Reference.create(context.categories["Sós nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Pufi Kukoricasnack",
      category: Reference.create(context.categories["Sós nassolnivalók"]),
      customizations: [
        createSnackFlavourCustomization(),
        createSnackSizeCustomization(),
      ],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
    },

    {
      name: "Nógrádi Ropogós",
      category: Reference.create(context.categories["Sós nassolnivalók"]),
      customizations: [createSnackSizeCustomization()],
      image: Buffer.from(snackImg, "base64"),
      imageType: "image/png",
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
