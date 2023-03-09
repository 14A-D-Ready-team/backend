import { Reference } from "@mikro-orm/core";
import { SeederContext } from "../utils";

export function getCategoryData(context: SeederContext) {
  return [
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
  ];
}
