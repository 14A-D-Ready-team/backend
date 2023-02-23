import {
  AbilityFactory,
  Action,
  RegisterAbilityFactory,
} from "@/shared/policy";
import { User } from "@/user";
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Product } from "./entity";

export type ProductSubjects = InferSubjects<typeof Product>;

export type ProductAbility = MongoAbility<[Action, ProductSubjects]>;

@RegisterAbilityFactory()
@Injectable()
export class ProductAbilityFactory implements AbilityFactory {
  public async createForUser(user?: User) {
    const { can, cannot, build } = new AbilityBuilder<ProductAbility>(
      createMongoAbility,
    );
    
    can(Action.Read, Product);

    if (!user) {
      return build({
        detectSubjectType: item =>
          item.constructor as ExtractSubjectType<ProductAbility>,
      });
    }

    const buffetOwner = user.buffetOwner?.unwrap();
    if (buffetOwner) {
      const buffets = await buffetOwner.buffet?.loadItems();
      can(Action.Create, Product, {
        buffetId: { $in: buffets.map(buffet => buffet.id) },
      });
    }

    const buffetWorker = user.buffetWorker?.unwrap();
    if (buffetWorker) {
      const buffetId = buffetWorker.buffet.id;
      can(Action.Create, Product, {
        buffetId,
      });
    }

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<ProductAbility>,
    });
  }
}
