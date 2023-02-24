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
    const builder = new AbilityBuilder<ProductAbility>(createMongoAbility);
    const { can } = builder;

    can(Action.Read, Product);

    if (!user) {
      return this.build(builder);
    }

    const buffetOwner = user.buffetOwner?.unwrap();
    if (buffetOwner) {
      const buffets = await buffetOwner.buffet?.loadItems({
        populate: ["categories"],
      });
      const categories = buffets.flatMap(
        buffet => buffet.categories?.getIdentifiers() ?? [],
      );
      can(Action.Create, Product, {
       catg
      });
    }

    const buffetWorker = user.buffetWorker?.unwrap();
    if (buffetWorker) {
      const buffetId = buffetWorker.buffet.id;
      can(Action.Create, Product, {
        buffetId,
      });
    }

    return this.build(builder);
  }

  private build(builder: AbilityBuilder<ProductAbility>) {
    return builder.build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<ProductAbility>,
    });
  }
}
