import { User } from "@/user";
import { AbilityBuilder, AbilityClass, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "./action.enum";

type AppSubjects = "all";

export type AppAbility = PureAbility<[Action, AppSubjects]>;

@Injectable()
export class AbilityFactory {
  public createForUser(user: User) {
    const builder = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);

    const { can, cannot, build } = builder;

    if (user.admin?.unwrap()) {
      can(Action.Manage, "all");
    }

    return build();
  }

  public extend() {}
}
