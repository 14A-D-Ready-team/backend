import { User, UserService } from "@/user";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { RegistrationDto } from "./dto";
import { LoginDto } from "./dto";

describe("AuthService", () => {
  let service: AuthService;
  let provider: UserService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     AuthService,
    //     { provide: UserService, useValue: { create: jest.fn() } },
    //   ],
    // }).compile();
    // service = module.get<AuthService>(AuthService);
    // provider = module.get<UserService>(UserService);
  });

  // it("should be defined", () => {
  //   expect(service).toBeDefined();
  //   expect(service).toBeInstanceOf(AuthService);
  // });

  // it("should signup", () => {
  //   const regDto = new RegistrationDto();
  //   service.signUp(regDto);
  //   expect(provider.create).toBeCalledWith(regDto);
  // });

  // it("should signin", () => {
  //   const logDto = new LoginDto();
  //   service.signIn(logDto);
  //   expect(service.signIn).toReturnWith(User);
  // });
});
