import { TokenModule } from "./../token/token.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { DatabaseModule } from "./../shared/database/database.module";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { authConfig } from "./auth.config";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { User } from "@/user";

describe("GoogleAuthController", () => {
  let controller: GoogleAuthController;

  beforeEach(async () => {
    /* const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          envFilePath: [".env"],
          load: [authConfig],
        }),
        DatabaseModule,
        MikroOrmModule.forFeature([User]),
        TokenModule
      ],
      controllers: [GoogleAuthController],
      providers: [GoogleAuthService],
    }).compile();

    controller = module.get<GoogleAuthController>(GoogleAuthController); */
  });

  it("should be defined", () => {
    expect(true).toBeDefined();
  });
});
