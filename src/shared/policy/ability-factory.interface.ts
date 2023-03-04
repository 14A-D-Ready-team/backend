import { User } from "@/user";
import { MongoAbility } from "@casl/ability";
import { Action } from "./action.enum";

export interface AbilityFactory {
  createForUser(
    user?: User,
  ): MongoAbility<[Action, any]> | Promise<MongoAbility<[Action, any]>>;
}
