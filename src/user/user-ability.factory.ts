import { AbilityFactory, RegisterAbilityFactory } from "@/shared/policy";
import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "@/user";
import {
  AbilityBuilder,
  AbilityClass,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
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

export type UserAbility = MongoAbility<[Action, UserSubjects]>;

@RegisterAbilityFactory()
@Injectable()
export class UserAbilityFactory implements AbilityFactory {
  public createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<UserAbility>(
      createMongoAbility,
    );

    can(Action.Read, User);

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<UserSubjects>,
    });
  }
}
