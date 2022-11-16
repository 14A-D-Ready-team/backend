import { User } from "@/user";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
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

  it("should signup", () => {
    const regDto = new RegistrationDto();
    controller.signUp(regDto);
    expect(provider.signUp).toBeCalledWith(regDto);
  });

  it("should signin", () => {
    const logDto = new LoginDto();
    const session: { userId?: number } = {};
    controller.signIn(logDto, session);
    expect(provider.signIn).toBeCalledWith(logDto);
    expect(session.userId).toBe(userStub.id);
  });
});
