import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "@/user";
import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "@shared/policy/action.enum";

type UserSubjects = InferSubjects<
  | typeof User
  | typeof Customer
  | typeof BuffetWorker
  | typeof BuffetOwner
  | typeof Admin
>;

export type UserAbility = PureAbility<[Action, UserSubjects]>;

@Injectable()
export class UserAbilityFactory {
  public createForUser(user: User) {
    const builder = new AbilityBuilder(
      PureAbility as AbilityClass<UserAbility>,
    );

    const { can, cannot, build } = builder;

    can(Action.Read, User);

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<UserSubjects>,
    });
  }
}
