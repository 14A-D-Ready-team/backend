import { User, UserSubjects } from "@/user";
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
import { ProductSubjects } from "./product";
import { map } from "p-iteration";

type AppSubjects = "all" | UserSubjects | ProductSubjects;

export type AppAbility = MongoAbility<[Action, AppSubjects]>;

@Injectable()
export class AppAbilityFactory implements AbilityFactory {
  constructor(private moduleRef: ModuleRef) {}

  public async createForUser(user: User) {
    const { can, build, rules } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.admin?.unwrap()) {
      can(Action.Manage, "all");
    }

    const extensionRules = await map(
      registeredAbilityFactories,
      async extension => {
        const abilityFactory = this.moduleRef.get(extension, { strict: false });
        return (await abilityFactory.createForUser(user)).rules;
      },
      this,
    );

    rules.push(...extensionRules.flat());

    return build();
  }
}
