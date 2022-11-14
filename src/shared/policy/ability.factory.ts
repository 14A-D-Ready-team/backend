import { Token } from "@/token";
import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "@/user";
import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "./action.enum";

type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Customer
      | typeof BuffetWorker
      | typeof BuffetOwner
      | typeof Admin
      | typeof Token
    >
  | "all";

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  public createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    if (user.admin?.unwrap()) {
      can(Action.Manage, "all");
    }

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
