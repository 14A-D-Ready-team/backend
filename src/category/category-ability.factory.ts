import {
  AbilityFactory,
  Action,
  RegisterAbilityFactory,
} from "@/shared/policy";
import { User } from "@/user";
import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Category } from "./entity";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

export type CategorySubjects = InferSubjects<
  typeof Category | typeof CreateCategoryDto | typeof UpdateCategoryDto
>;

export type CategoryAbility = MongoAbility<[Action, CategorySubjects]>;

@RegisterAbilityFactory()
@Injectable()
export class CategoryAbilityFactory implements AbilityFactory {
  public async createForUser(user?: User) {
    const builder = new AbilityBuilder<CategoryAbility>(createMongoAbility);
    const { can } = builder;

    can(Action.Read, Category);

    if (!user) {
      return builder.build();
    }

    const owner = user.buffetOwner?.getEntity();
    const worker = user.buffetWorker?.getEntity();

    if (owner || worker) {
      let buffetIds: number[] = [];
      if (owner) {
        await owner.buffets.loadItems();
        buffetIds = owner.buffets.getIdentifiers();
      }
      if (worker) {
        buffetIds = [worker.buffet.id];
      }

      can(Action.Create, CreateCategoryDto, {
        buffetId: { $in: buffetIds },
      });
      can(Action.Update, Category, {
        buffetId: { $in: buffetIds },
      });
      can(Action.Update, UpdateCategoryDto, {
        buffetId: { $in: [...buffetIds, undefined] },
      });
      can(Action.Delete, Category, { buffetId: { $in: buffetIds } });
    }

    return builder.build();
  }
}
