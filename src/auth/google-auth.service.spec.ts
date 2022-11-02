import { AuthModule } from "./auth.module";
import { Test, TestingModule } from "@nestjs/testing";
import { GoogleAuthService } from "./google-auth.service";

describe("GoogleAuthService", () => {
  let service: GoogleAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [GoogleAuthService],
    }).compile();

    service = module.get<GoogleAuthService>(GoogleAuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
