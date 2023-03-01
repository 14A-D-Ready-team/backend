import { User, UserSubjects } from "@/user";
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  MongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import {
  AbilityFactory,
  Action,
  registeredAbilityFactories,
} from "@/shared/policy";
import { ProductSubjects } from "@/product";
import { map } from "p-iteration";
import { BuffetSubjects } from "./buffet";

type AppSubjects = "all" | UserSubjects | ProductSubjects | BuffetSubjects;

export type AppAbility = MongoAbility<[Action, AppSubjects]>;

@Injectable()
export class AppAbilityFactory implements AbilityFactory {
  constructor(private moduleRef: ModuleRef) {}

  public async createForUser(user?: User) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (!user) {
      return this.buildAbility(builder, user);
    }

    const { can } = builder;

    if (user.admin?.unwrap()) {
      can(Action.Manage, "all");
    }

    return this.buildAbility(builder, user);
  }

  private async buildAbility(builder: AbilityBuilder<AppAbility>, user?: User) {
    const { build, rules } = builder;

    const extensionRules = await map(
      registeredAbilityFactories,
      async extension => {
        const abilityFactory = this.moduleRef.get(extension, { strict: false });
        return (await abilityFactory.createForUser(user)).rules;
      },
      this,
    );

    rules.push(...extensionRules.flat());

    return build({
      detectSubjectType: item => {
        return item.constructor as ExtractSubjectType<AppAbility>;
      },
    });
  }
}
