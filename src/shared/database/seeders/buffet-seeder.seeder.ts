import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { BuffetFactory } from "../factories";
import { SeederContext } from "../utils";
import { getBuffetData } from "./buffet.data";

export class BuffetSeeder extends Seeder {
  public async run(em: EntityManager, context: SeederContext): Promise<void> {
    for (const b of getBuffetData(context)) {
      const buffet = new BuffetFactory(em).makeOne({
        ...b,
      });
      context.buffets = { ...(context.buffets || {}), [b.name!]: buffet };
      await em.persistAndFlush(buffet);
    }
  }
}
