import { Buffet } from "@/buffet/entity/buffet.entity";

type BuffetData = Partial<Buffet>;

export function getBuffetData(): BuffetData[] {
  return [
    {
      name: "Sörkert",
      coords: "47.69535097415908, 17.667713973715607",
      address: "Nagysándor József utca 52",
      hours: "10-16",
      description: "R.I.P",
      //buffetOwner:
    },
    {
      name: "Jedlik büfé",
      coords: "69, 69",
      address: "Jedlik suli GYőr",
      hours: "8-14",
      description: "Szemét",
      //buffetOwner:
    },
  ];
}
