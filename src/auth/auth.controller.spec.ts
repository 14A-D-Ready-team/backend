import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RegistrationDto } from "./dto";

describe("AuthController", () => {
  let controller: AuthController;
  let provider: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{provide: AuthService, useValue: {signUp: jest.fn()}}],
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
});
