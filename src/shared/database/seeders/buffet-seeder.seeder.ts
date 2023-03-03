import { BuffetOwner, User } from "@/user";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { BuffetFactory } from "../factories";
import { SeederContext } from "../utils";
import { getBuffetData } from "./buffet.data";

export class BuffetSeeder extends Seeder {
    public async run(em: EntityManager, context: SeederContext): Promise<void> {
      const buffets = getBuffetData().map(b => {
        const buffet = new BuffetFactory(em).makeOne({
          ...b, 
          buffetOwner: context.buffetOwners.buffetOwner,
        });
        return buffet;
      });
      await em.persistAndFlush(buffets);
    }
  }