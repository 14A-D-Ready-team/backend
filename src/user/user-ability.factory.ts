import { AbilityFactory, RegisterAbilityFactory } from "@/shared/policy";
import { Admin, BuffetOwner, BuffetWorker, Customer, User } from "@/user";
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "@shared/policy/action.enum";

export type UserSubjects = InferSubjects<
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

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<UserSubjects>,
    });
  }
}
