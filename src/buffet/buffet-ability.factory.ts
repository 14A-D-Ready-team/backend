import {
  RegisterAbilityFactory,
  AbilityFactory,
  Action,
} from "@/shared/policy";
import { User } from "@/user";
import {
  InferSubjects,
  MongoAbility,
  AbilityBuilder,
  createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { CreateBuffetDto } from "./dto/create-buffet.dto";
import { UpdateBuffetDto } from "./dto/update-buffet.dto";
import { Buffet } from "./entity";

export type BuffetSubjects = InferSubjects<
  typeof Buffet | typeof CreateBuffetDto | typeof UpdateBuffetDto
>;

export type BuffetAbility = MongoAbility<[Action, BuffetSubjects]>;

@RegisterAbilityFactory()
@Injectable()
export class BuffetAbilityFactory implements AbilityFactory {
  public async createForUser(user?: User) {
    const builder = new AbilityBuilder<BuffetAbility>(createMongoAbility);
    const { can } = builder;

    can(Action.Read, Buffet);

    if (!user) {
      return builder.build();
    }

    const buffetOwner = user.buffetOwner?.unwrap();
    if (buffetOwner) {
      can(Action.Create, [Buffet, CreateBuffetDto]);
      can(Action.Update, [Buffet, UpdateBuffetDto]);
      can(Action.Delete, Buffet);
    }

    const buffetWorker = user.buffetWorker?.unwrap();
    if (buffetWorker) {
      can(Action.Update, [Buffet, UpdateBuffetDto]);
    }

    const admin = user.admin?.unwrap();
    if (admin) {
      can(Action.Create, [Buffet, CreateBuffetDto]);
      can(Action.Update, [Buffet, UpdateBuffetDto]);
      can(Action.Delete, Buffet);
    }

    return builder.build();
  }
}
