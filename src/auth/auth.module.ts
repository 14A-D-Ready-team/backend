import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { authConfig } from "./auth.config";
import { User } from "@/user";
import { TokenModule } from "@/token";

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    MikroOrmModule.forFeature([User]),
    TokenModule,
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [AuthService, GoogleAuthService],
})
export class AuthModule {}
