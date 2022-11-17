import { AppAbilityFactory } from "@/app-ability.factory";
import { AuthState } from "@/auth";
import { User } from "@/user";
import {
  AbilityBuilder,
  AnyMongoAbility,
  createMongoAbility,
} from "@casl/ability";
import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext, Get, Type } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CheckPolicies } from "../decorator";
import { PolicyGuard } from "./policy.guard";

describe("PolicyGuard", () => {
  let guard: PolicyGuard;
  let authStateStub: AuthState;
  let userStub: User;
  let abilityStub: AnyMongoAbility;

  class Phandler2 {
    public handle(ability: AnyMongoAbility) {
      expect(ability).toBe(abilityStub);
      return true;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyGuard,
        {
          provide: AppAbilityFactory,
          useValue: {
            createForUser: jest.fn().mockImplementation(() => {
              const builder = new AbilityBuilder(createMongoAbility);

              builder.can("read", "all");

              abilityStub = builder.build();
              return abilityStub;
            }),
          },
        },
        Phandler2,
      ],
    }).compile();

    guard = module.get<PolicyGuard>(PolicyGuard);
    userStub = new User();
    userStub.id = 1;
    authStateStub = new AuthState(userStub);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  it("should allow requests for methods that doesn't have @CheckPolicies", async () => {
    class TestController {
      @Get("/")
      public testMethod() {}
    }

    const context = await createContext(
      {},
      { locals: { authState: authStateStub } },
      TestController,
    );
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it("should check policies of methods that has @CheckPolicies", async () => {
    const phandler1 = jest.fn().mockImplementation(ability => {
      expect(ability).toBe(abilityStub);
      return true;
    });

    class TestController {
      @CheckPolicies(phandler1)
      @Get("/")
      public testMethod() {}
    }

    const context = await createContext(
      {},
      { locals: { authState: authStateStub } },
      TestController,
    );
    const result = await guard.canActivate(context);
    expect(phandler1).toBeCalled();
    expect(result).toBe(true);
  });

  it("should check policies of methods of controllers that has @CheckPolicies", async () => {
    const phandler1 = jest.fn().mockImplementation(ability => {
      expect(ability).toBe(abilityStub);
      return true;
    });

    @CheckPolicies(phandler1)
    class TestController {
      @Get("/")
      public testMethod() {}
    }

    const context = await createContext(
      {},
      { locals: { authState: authStateStub } },
      TestController,
    );
    const result = await guard.canActivate(context);
    expect(phandler1).toBeCalled();
    expect(result).toBe(true);
  });

  it("shouldn't allow requests that aren't logged in when @CheckPolicies are present", async () => {
    @CheckPolicies(() => true)
    class TestController {
      @Get("/")
      public testMethod() {}
    }

    const context = await createContext(
      {},
      { locals: { authState: new AuthState(undefined) } },
      TestController,
    );
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });

  it("shouldn't allow requests that violate policies", async () => {
    @CheckPolicies(() => false)
    class TestController {
      @Get("/")
      public testMethod() {}
    }

    const context = await createContext(
      {},
      { locals: { authState: new AuthState(undefined) } },
      TestController,
    );
    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });

  it("should throw an error if the user is not loaded", async () => {
    @CheckPolicies(() => false)
    class TestController {
      @Get("/")
      public testMethod() {}
    }

    const context = await createContext(
      {},
      { locals: { authState: new AuthState(1) } },
      TestController,
    );
    expect(guard.canActivate(context)).rejects.toThrowError(
      "User is not loaded by AuthGuard",
    );
  });

  it("should check functional policy handlers, policy handler instances and types", async () => {
    const phandler1 = jest.fn().mockImplementation(ability => {
      expect(ability).toBe(abilityStub);
      return true;
    });

    jest.spyOn(Phandler2.prototype, "handle");

    const phandler3 = new Phandler2();

    class TestController {
      @Get("/")
      @CheckPolicies(phandler1, Phandler2, phandler3)
      public testMethod() {}
    }

    const context = await createContext(
      {},
      { locals: { authState: new AuthState(userStub) } },
      TestController,
    );

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
    expect(phandler1).toBeCalled();
    expect(Phandler2.prototype.handle).toBeCalledTimes(2);
  });
});

async function createContext(req: any, res: any, controller: Type<any>) {
  const context = createMock<ExecutionContext>({
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(req),
      getResponse: jest.fn().mockReturnValue(res),
    }),
    getClass: jest.fn().mockReturnValue(controller),
    getHandler: jest.fn().mockReturnValue(controller.prototype.testMethod),
  });

  return context;
}
