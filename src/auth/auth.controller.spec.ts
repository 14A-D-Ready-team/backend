import { User } from "@/user";
import { createMock } from "@golevelup/ts-jest";
import { Test, TestingModule } from "@nestjs/testing";
import { Session } from "express-session";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthState } from "./auth.state";
import { LoginDto, RegistrationDto } from "./dto";

describe("AuthController", () => {
  let controller: AuthController;
  let provider: AuthService;
  let userStub: User;

  beforeEach(async () => {
    userStub = new User();
    userStub.id = 69;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn().mockImplementation(async s => userStub),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    provider = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(AuthController);
  });

  it("should signup", async () => {
    const regDto = new RegistrationDto();
    await controller.signUp(regDto);
    expect(provider.signUp).toBeCalledWith(regDto);
  });

  it("should signin", async () => {
    const logDto = new LoginDto();
    const session: { userId?: number } = {};

    await controller.signIn(logDto, session);
    const signin = await controller.signIn(logDto, session);

    expect(provider.signIn).toBeCalledWith(logDto);
    expect(signin).toBe(userStub);
    expect(session.userId).toBe(userStub.id);
  });

  it("should signin with session", async () => {
    const authState = new AuthState(userStub, {} as any);

    expect(await controller.sessionSignIn(authState)).toBe(userStub);
  });

  it("should logout", async () => {
    const session = createMock<Session>({ destroy: jest.fn().mockImplementation(c => c()) });
    const authState = new AuthState(
      userStub,
      session,
    );

    await controller.logout(authState);
    
    expect(session.destroy).toBeCalled();
    
  });
});
