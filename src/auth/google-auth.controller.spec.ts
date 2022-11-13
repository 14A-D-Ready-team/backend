import { User, UserType } from "@/user";
import { Test, TestingModule } from "@nestjs/testing";
import { VerifyGoogleAuthDto } from "./dto";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";

describe("GoogleAuthController", () => {
  let controller: GoogleAuthController;
  const userStub = new User();

  beforeEach(async () => {
    userStub.id = 1;

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [GoogleAuthController],
      providers: [
        {
          provide: GoogleAuthService,
          useValue: {
            verify: jest.fn().mockReturnValue(userStub),
          },
        },
      ],
    }).compile();

    controller = module.get<GoogleAuthController>(GoogleAuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return a user, and set session", async () => {
    const payload = new VerifyGoogleAuthDto();
    payload.token = "token";
    payload.userType = UserType.Customer;
    const session = {};

    const result = await controller.verify(payload, session);
    expect(result).toEqual(userStub);
    expect(session).toEqual({ userId: userStub.id });
  });
});
