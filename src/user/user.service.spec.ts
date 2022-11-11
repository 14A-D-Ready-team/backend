import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User } from "./entity";
import { UserStatus } from "./enum";
import { EmailDuplicateException } from "./duplicate-email.exeption";
import { UserData } from "./user-data.interface";

const mockUser: UserData = {
  name: "John Doe",
  email: "example@gmail.com",
  password: "Supas3cr3t!",
  type: 0,
  status: UserStatus.Inactive,
};

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     {
    //       provide: UserService,
    //       useValue: { create: jest.fn().mockResolvedValue("value") },
    //     },
    //   ],
    // }).compile();

    // service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    // expect(service).toBeDefined();
    // expect(service).toBeInstanceOf(UserService);
  });

  it("should create user", async () => {
    // const testUser = await service.create(mockUser);
    // expect(testUser).toBe(User);
  });

  it("create hadles an error", () => {
    //expect(service.create(mockUser)).rejects.toThrow(EmailDuplicateException);
  });
});
