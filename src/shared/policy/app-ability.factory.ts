import { User } from "@/user";
import {
  AbilityBuilder,
  AbilityClass,
  createMongoAbility,
  MongoAbility,
  PureAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { AbilityFactory } from "./ability-factory.interface";
import { Action } from "./action.enum";

type AppSubjects = "all";

export type AppAbility = MongoAbility<[Action, AppSubjects]>;

@Injectable()
export class AppAbilityFactory implements AbilityFactory {
  private extensions: AbilityFactory[] = [];

  public createForUser(user: User) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    const { can, cannot, build } = builder;

    if (user.admin?.unwrap()) {
      can(Action.Manage, "all");
    }

    const extensionRules = this.extensions
      .map(extension => extension.createForUser(user).rules)
      .flat();

    builder.rules.push(...extensionRules);

    return build();
  }

  public extend(factory: AbilityFactory) {
    this.extensions.push(factory);
  }
}
