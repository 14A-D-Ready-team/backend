/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  MongoQuery,
} from "@casl/ability";
import { AnyObject } from "@casl/ability/dist/types/types";
import { createMock } from "@golevelup/ts-jest";
import { Reference } from "@mikro-orm/core";
import { Test } from "@nestjs/testing";
import { AppAbilityFactory } from "./app-ability.factory";
import {
  AbilityFactory,
  Action,
  RegisterAbilityFactory,
  registeredAbilityFactories,
} from "./shared/policy";
import { Admin, User } from "./user";

const originalFactories = [...registeredAbilityFactories];

registeredAbilityFactories.splice(0, registeredAbilityFactories.length);

type Subjects1 = "sub1";
type Ability1 = MongoAbility<[Action, Subjects1]>;

@RegisterAbilityFactory()
class TestAbilityFactory1 implements AbilityFactory {
  public createForUser(): MongoAbility<[Action, any], MongoQuery<AnyObject>> {
    const { can, build } = new AbilityBuilder<Ability1>(createMongoAbility);

    can(Action.Manage, "sub1");
    return build();
  }
}

type Subjects2 = "sub2";
type Ability2 = MongoAbility<[Action, Subjects2]>;

@RegisterAbilityFactory()
class TestAbilityFactory2 implements AbilityFactory {
  public createForUser(): MongoAbility<[Action, any], MongoQuery<AnyObject>> {
    const { can, build } = new AbilityBuilder<Ability2>(createMongoAbility);

    can(Action.Manage, "sub2");

    return build();
  }
}

describe("AppAbilityFactory", () => {
  let factory: AppAbilityFactory;
  let adminStub: User;
  let userStub: User;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppAbilityFactory,
        TestAbilityFactory1,
        TestAbilityFactory2,
        ...originalFactories,
      ],
    }).compile();

    factory = module.get<AppAbilityFactory>(AppAbilityFactory);

    adminStub = new User();
    adminStub.id = 1;
    adminStub.admin = createMock<Reference<Admin>>({
      unwrap: jest.fn().mockReturnValue(new Admin()),
    });

    userStub = new User();
    userStub.id = 2;
  });

  it("should be defined", () => {
    expect(factory).toBeDefined();
    expect(factory).toBeInstanceOf(AppAbilityFactory);
  });

  it("should provide admin rights for admins", () => {
    const ability = factory.createForUser(adminStub);
    expect(ability.can(Action.Manage, "all")).toBe(true);
  });

  it("should be extendable", async () => {
    const ability = factory.createForUser(userStub);
    expect(ability.can(Action.Manage, "sub1" as any)).toBe(true);
    expect(ability.can(Action.Manage, "sub2" as any)).toBe(true);
  });

  it("should run it's original extensions without errors", async () => {
    registeredAbilityFactories.splice(0, registeredAbilityFactories.length);
    registeredAbilityFactories.push(...originalFactories);
    console.log(registeredAbilityFactories);
    const ability = factory.createForUser(userStub);
    expect(ability).toBeDefined();
  });
});
