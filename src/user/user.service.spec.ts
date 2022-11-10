import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User } from "./entity";
import { UserStatus } from "./enum";
import { EmailDuplicateException } from "./duplicate-email.exeption";
//import { TokenType } from "@/token";

const mockUser = {
  id: 1,
  name: "John Doe",
  email: "example@gmail.com",
  password: "Supas3cr3t!",
  type: 0,
  status: UserStatus.Inactive,
  //tokens: TokenType.Authentication,
};

describe("UserService", () => {
  let service: any;
  // let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: { create: jest.fn().mockResolvedValue("value") },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(UserService);
  });

  it("should create user", async () => {
    service.create(mockUser).mockResolvedValue("value");
    const result = await service.create(mockUser);

    //service.create(mockUser);

    expect(service.create(mockUser)).toBeCalledWith(mockUser);
    expect(result).toEqual("value");
  });

  it("create hadles an error", () => {
    service.create.mockResolvedValue(null);
    expect(service.create()).rejects.toThrow(EmailDuplicateException);
  });
});
