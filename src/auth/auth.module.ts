import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { authConfig } from "./auth.config";
import {
  Admin,
  BuffetOwner,
  BuffetWorker,
  Customer,
  User,
  UserModule,
} from "@/user";
import { TokenModule } from "@/token";
import { AuthGuard } from "./guards";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    MikroOrmModule.forFeature([
      User,
      Admin,
      Customer,
      BuffetOwner,
      BuffetWorker,
    ]),
    TokenModule,
    UserModule,
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [AuthService, GoogleAuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
