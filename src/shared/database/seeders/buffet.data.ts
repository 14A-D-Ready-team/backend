import { Buffet } from "@/buffet/entity/buffet.entity";
import defaultImg from "./buffet-images/default";

type BuffetData = Partial<Buffet>;

export function getBuffetData(): BuffetData[] {
  return [
    {
      name: "Sörkert",
      coords: "47.69535097415908, 17.667713973715607",
      address: "Győr, Nagysándor József utca 52",
      hours: `
        Hétfő:     10:00 – 18:00
        Kedd: 	   10:00 – 18:00
        Szerda:	   10:00 – 18:00
        Csütörtök: 10:00 – 18:00
        Péntek:	   10:00 – 18:00
        Szombat:   10:00 - 14:00
        Vasárnap:	 Zárva
      `,
      description:
        "Büfé a Xantus János Állatkert közelében. Baráti környezet, olcsó árak.",
      image: defaultImg,
      imageType: "image/png",
    },
    {
      name: "Jedlik büfé",
      coords: "47.68245999072191, 17.63033089810631",
      address: "Győr, Szent István út 7, 9021",
      hours: `
        Hétfő:     08:00 – 13:00
        Kedd: 	   08:00 – 13:00
        Szerda:	   08:00 – 13:00
        Csütörtök: 08:00 – 13:00
        Péntek:	   08:00 – 13:00
        Szombat:   Zárva
        Vasárnap:	 Zárva
      `,
      description:
        "Büfé a Győri Szakképzési Centrum Jedlik Ányos Gépipari és Informatikai iskolában. Széles választék, gyors kiszolgálás.",
      image: defaultImg,
      imageType: "image/png",
    },
  ];
}
