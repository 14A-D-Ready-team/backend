import { CheckPolicies } from "@/shared/policy";
import { User } from "@/user";
import { createMock } from "@golevelup/ts-jest";
import {
  ExecutionContext,
  Get,
  Type,
  UnauthorizedException,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { AuthState } from "../auth.state";
import { Auth } from "../decorator";
import { AuthGuard } from "./auth.guard";

class TestController {
  @Auth()
  @Get("/")
  public testMethod() {}
}

class TestController2 {
  @Get("/")
  public testMethod() {}
}

@Auth()
class TestController3 {
  @Get("/")
  public testMethod() {}
}

@Auth(false)
class TestController4 {
  @Get("/")
  public testMethod() {}
}

@Auth(false)
class TestController5 {
  @Auth()
  @Get("/")
  public testMethod() {}
}

@Auth()
class TestController6 {
  @Auth(false)
  @Get("/")
  public testMethod() {}
}

class TestController7 {
  @CheckPolicies(ability => true)
  @Get("/")
  public testMethod() {}
}

@CheckPolicies(ability => true)
class TestController8 {
  @Get("/")
  public testMethod() {}
}

describe("AuthGuard", () => {
  let guard: AuthGuard;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            sessionLogin: jest.fn().mockImplementation((userId: number) => {
              const user = new User();
              user.id = userId;
              return user;
            }),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
    expect(guard).toBeInstanceOf(AuthGuard);
  });

  it("should load users for methods that has @Auth", async () => {
    await testGuard(guard, TestController, true);
  });

  it("should load users for methods that has @CheckPolicies", async () => {
    await testGuard(guard, TestController7, true);
  });

  it("should not load users for methods that doesn't have @Auth", async () => {
    await testGuard(guard, TestController2, false);
  });

  it("should load users for methods of controllers that has @Auth", async () => {
    await testGuard(guard, TestController3, true);
  });

  it("should load users for methods of controllers that has @CheckPolicies", async () => {
    await testGuard(guard, TestController8, true);
  });

  it("should not load users for methods of controllers that has @Auth(false)", async () => {
    await testGuard(guard, TestController4, false);
  });

  it("handler authenticate metadata should override controller metadata", async () => {
    await testGuard(guard, TestController5, true);
    await testGuard(guard, TestController6, false);
  });

  it("should throw error on methods that have @CheckPolicies, but the user is not logged in", async () => {
    const req = {
      session: {},
    };
    const res = {
      locals: {} as { authState: AuthState },
    };

    const context = await createContext(req, res, TestController7);

    await expect(guard.canActivate(context)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
});

async function testGuard(
  guard: AuthGuard,
  controller: Type<any>,
  shouldAuthenticate: boolean,
) {
  const req = {
    session: {
      userId: 1,
    },
  };
  const res = {
    locals: {} as { authState: AuthState },
  };

  const context = await createContext(req, res, controller);

  await expect(guard.canActivate(context)).resolves.toBe(true);
  expect(res.locals.authState).toBeDefined();
  if (shouldAuthenticate) {
    expect(res.locals.authState.isLoggedIn).toBe(true);
    expect(res.locals.authState.user).toBeInstanceOf(User);
    expect(res.locals.authState.user?.id).toBe(req.session.userId);
  } else {
    expect(res.locals.authState.isLoggedIn).toBe(true);
    expect(res.locals.authState.user).toBeUndefined();
  }
}

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
