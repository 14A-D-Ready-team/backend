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
import { CreateProductDto } from "./dto";
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

    let ownCategoryIds: number[] = [];

    const buffetOwner = user.buffetOwner?.unwrap();
    if (buffetOwner) {
      const buffets = await buffetOwner.buffet?.loadItems({
        populate: ["categories"],
      });
      ownCategoryIds = buffets.flatMap(buffet => buffet.categoryIds);
    }

    const buffetWorker = user.buffetWorker?.unwrap();
    if (buffetWorker) {
      const buffet = await buffetWorker.buffet.load({
        populate: ["categories"],
      });
      ownCategoryIds = buffet.categoryIds;
    }

    can([Action.Create], [Product, CreateProductDto], {
      categoryId: { $in: ownCategoryIds },
    });

    can(Action.Update, Product, {
      categoryId: { $in: ownCategoryIds },
    });

    can(Action.Delete, Product, {
      categoryId: { $in: ownCategoryIds },
    });

    return this.build(builder);
  }

  private build(builder: AbilityBuilder<ProductAbility>) {
    return builder.build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<ProductAbility>,
    });
  }
}
