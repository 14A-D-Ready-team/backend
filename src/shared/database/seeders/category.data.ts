import { Reference } from "@mikro-orm/core";
import { SeederContext } from "../utils";

export function getCategoryData(context: SeederContext) {
  return [
    //JEDLIK
    {
      name: "Italok",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Melegszendvicsek",
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
      name: "Gyorsételek",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Fincsi ®",
      buffet: Reference.create(context.buffets["Jedlik büfé"]),
    },
    {
      name: "Forró italok",
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
      name: "Nassolnivalók",
      buffet: Reference.create(context.buffets["Sörkert"]),
    },
    {
      name: "Forró italok",
      buffet: Reference.create(context.buffets["Sörkert"]),
    },
    //TÓNI
    {
      name: "Italok",
      buffet: Reference.create(context.buffets["Tóni Falatozó Gyros & Grill"]),
    },
    {
      name: "Melegszendvicsek",
      buffet: Reference.create(context.buffets["Tóni Falatozó Gyros & Grill"]),
    },
    {
      name: "Nassolnivalók",
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
