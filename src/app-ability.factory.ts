import { User } from "@/user";
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import {
  AbilityFactory,
  Action,
  registeredAbilityFactories,
} from "@/shared/policy";
import { UserAbility, UserAbilityFactory } from "./user/user-ability.factory";

type AppSubjects = "all";

export type AppAbility = MongoAbility<[Action, AppSubjects]> | UserAbility;

@Injectable()
export class AppAbilityFactory implements AbilityFactory {
  constructor(private moduleRef: ModuleRef) {}

  public createForUser(user: User) {
    const { can, build, rules } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.admin?.unwrap()) {
      can(Action.Manage, "all");
    }

    const extensionRules = registeredAbilityFactories
      .map(extension => {
        const abilityFactory = this.moduleRef.get(extension, { strict: false });
        return abilityFactory.createForUser(user).rules;
      }, this)
      .flat();

    rules.push(...extensionRules);

    return build();
  }
}
