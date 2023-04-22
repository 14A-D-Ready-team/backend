import { Reference } from "@mikro-orm/core";
import { SeederContext } from "../utils";

export function getCategoryData(context: SeederContext) {
  return [
    //JEDLIK
    {
      name: "Üdítők",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Péksütik",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Édességek",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Fincsi ®",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Kávék & Teák",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Nassolnivalók",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    //SÖRKERT
    {
      name: "Italok",
      buffet: Reference.create(context.buffets["Sörkert"]),
    },
    {
      name: "Melegszendvicsek",
      buffet: Reference.create(context.buffets["Sörkert"]),
    },
    {
      name: "Nasik",
      buffet: Reference.create(context.buffets["Sörkert"]),
    },
    //TÓNI
    {
      name: "Frissítők",
      buffet: Reference.create(context.buffets["Tóni Falatozó Gyros & Grill"]),
    },
    {
      name: "Sós nassolnivalók",
      buffet: Reference.create(context.buffets["Tóni Falatozó Gyros & Grill"]),
    },
    {
      name: "Gyorsételek",
      buffet: Reference.create(context.buffets["Tóni Falatozó Gyros & Grill"]),
    },
    {
      name: "Forró italok",
      buffet: Reference.create(context.buffets["Tóni Falatozó Gyros & Grill"]),
    },
  ];
}
